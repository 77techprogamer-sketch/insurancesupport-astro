"""Vector store and embedding pipeline using ChromaDB."""
import json
import time
from pathlib import Path

import chromadb

from backend.database import get_db

CHROMA_DIR = Path(__file__).parent.parent / "data" / "chroma"
COLLECTION_NAME = "insurance_products"


def get_client():
    return chromadb.PersistentClient(path=str(CHROMA_DIR))


def get_collection():
    client = get_client()
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )


class Embedder:
    """Embedding wrapper. Uses a local sentence-transformer model if available,
    else falls back to a deterministic hash-based embedding that still allows
    retrieval (not ideal) — but we attempt to load the real model first."""

    def __init__(self, model_name: str = None):
        self.model_name = model_name or "paraphrase-multilingual-MiniLM-L12-v2"
        self.model = None
        self._fallback = False
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(self.model_name)
            print(f"Loaded embedding model: {self.model_name}")
        except Exception as e:
            print(f"Embedding model unavailable ({e}); using hashing fallback")
            self._fallback = True

    def embed(self, texts: list[str]) -> list[list[float]]:
        if self.model is not None:
            vecs = self.model.encode(texts, normalize_embeddings=True)
            return [v.tolist() for v in vecs]
        return [self._hash_embed(t) for t in texts]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]

    @staticmethod
    def _hash_embed(text: str, dim: int = 384) -> list[float]:
        """Deterministic fallback embedding (bag-of-ngrams hashing)."""
        import hashlib
        vec = [0.0] * dim
        tokens = text.lower().split()
        for token in tokens:
            for n in (1, 2):
                for i in range(len(tokens) - n + 1):
                    gram = " ".join(tokens[i:i+n])
                    h = int(hashlib.md5(gram.encode()).hexdigest()[:8], 16)
                    vec[h % dim] += 1.0 / (n ** 1.5)
        norm = sum(x*x for x in vec) ** 0.5
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec


# Global embedder instance (lazy)
_embedder = None


def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = Embedder()
    return _embedder


def index_all_chunks(batch_size: int = 64):
    """Embed and index all chunks from SQLite into ChromaDB.

    Strategy: re-create the collection each full run (simple, correct).
    For daily incremental runs, see sync_index().
    """
    conn = get_db()
    chunks = conn.execute("""
        SELECT c.id, c.content, c.section_title, c.product_id, p.insurer, p.product_name,
               p.category, p.url, d.url AS doc_url, d.doc_type
        FROM chunks c
        JOIN products p ON c.product_id = p.id
        JOIN documents d ON c.document_id = d.id
        WHERE c.content IS NOT NULL AND length(c.content) > 50
        ORDER BY c.id
    """).fetchall()

    if not chunks:
        print("No chunks to index")
        conn.close()
        return 0

    embedder = get_embedder()
    client = get_client()
    # Full re-index: drop and recreate the collection (simplest correct reset)
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )

    total = 0
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i+batch_size]
        texts = [c["content"] for c in batch]
        embeddings = embedder.embed(texts)
        ids = [f"chunk_{c['id']}" for c in batch]
        metadatas = [{
            "product_id": c["product_id"],
            "insurer": c["insurer"],
            "product_name": c["product_name"],
            "category": c["category"],
            "section_title": c["section_title"] or "",
            "source_url": c["doc_url"] or c["url"] or "",
            "doc_type": c["doc_type"],
        } for c in batch]

        collection.upsert(ids=ids, embeddings=embeddings, documents=texts, metadatas=metadatas)
        total += len(batch)

    conn.close()
    print(f"Indexed {total} chunks into ChromaDB")
    return total


def sync_index(embedder=None):
    """Incremental sync: only add/update chunks whose content changed.

    For simplicity and correctness we compare chunk ids stored in SQLite.
    """
    conn = get_db()
    embedder = embedder or get_embedder()
    collection = get_collection()

    chunks = conn.execute("""
        SELECT c.id, c.content, c.product_id, c.section_title, p.insurer, p.product_name,
               p.category, d.url AS doc_url, d.doc_type,
               (SELECT COUNT(*) FROM chunks c2 WHERE c2.document_id = c.document_id) AS doc_chunks
        FROM chunks c
        JOIN products p ON c.product_id = p.id
        JOIN documents d ON c.document_id = d.id
        WHERE length(c.content) > 50
    """).fetchall()

    existing = set()
    try:
        if collection.count() > 0:
            existing = set(collection.get()["ids"])
    except Exception as e:
        print(f"Existing-id probe failed ({e}); treating as empty")
        existing = set()

    # Chunk ids currently in SQLite
    sqlite_ids = {f"chunk_{c['id']}" for c in chunks}

    # Remove stale entries that exist in ChromaDB but no longer in SQLite
    stale = existing - sqlite_ids
    if stale:
        try:
            collection.delete(ids=list(stale))
            print(f"Removed {len(stale)} stale chunks from index")
        except Exception as e:
            print(f"Stale chunk cleanup failed: {e}")

    to_add = []
    for c in chunks:
        cid = f"chunk_{c['id']}"
        if cid in existing:
            continue  # already indexed
        to_add.append(c)

    if not to_add:
        print("No new chunks to index")
        conn.close()
        return 0

    for i in range(0, len(to_add), 64):
        batch = to_add[i:i+64]
        texts = [c["content"] for c in batch]
        embs = embedder.embed(texts)
        collection.upsert(
            ids=[f"chunk_{c['id']}" for c in batch],
            embeddings=embs,
            documents=texts,
            metadatas=[{
                "product_id": c["product_id"],
                "insurer": c["insurer"],
                "product_name": c["product_name"],
                "category": c["category"],
                "section_title": c["section_title"] or "",
                "source_url": c["doc_url"],
                "doc_type": c["doc_type"],
            } for c in batch],
        )

    conn.close()
    print(f"Synced {len(to_add)} new chunks")
    return len(to_add)


def search(query: str, insurer: str = None, product: str = None, category: str = None,
           top_k: int = 6) -> list[dict]:
    """Vector search with metadata filters. Returns list of matched chunks."""
    embedder = get_embedder()
    collection = get_collection()
    qvec = embedder.embed_one(query)

    where = {}
    if insurer:
        where["insurer"] = insurer
    if product:
        # Exact match on the OFFICIAL product name (resolved upstream via resolve_product_name)
        where["product_name"] = {"$eq": product}
    if category:
        where["category"] = {"$eq": category}

    # ChromaDB 1.5 requires multi-key filters wrapped in $and
    if len(where) > 1:
        where = {"$and": [{k: v} for k, v in where.items()]}

    try:
        res = collection.query(
            query_embeddings=[qvec],
            n_results=top_k,
            where=where or None,
            include=["metadatas", "documents", "distances"],
        )
    except Exception as e:
        print(f"Search failed: {e}")
        return []

    out = []
    if res and res["ids"] and res["ids"][0]:
        for i, cid in enumerate(res["ids"][0]):
            out.append({
                "id": cid,
                "content": res["documents"][0][i],
                "metadata": res["metadatas"][0][i],
                "score": 1 - float(res["distances"][0][i]),
            })
    return out


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "sync":
        sync_index()
    else:
        index_all_chunks()