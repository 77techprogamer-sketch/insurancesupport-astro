"""Database setup and metadata schema for the Insurance RAG system."""
import sqlite3
import json
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).parent.parent / "data" / "insurance_metadata.db"


def get_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            insurer TEXT NOT NULL,
            product_name TEXT NOT NULL,
            plan_number TEXT,
            uin TEXT,
            category TEXT NOT NULL,
            product_type TEXT,
            url TEXT,
            brochure_url TEXT,
            sales_status TEXT DEFAULT 'live',
            effective_date TEXT,
            last_updated TEXT,
            source_hash TEXT,
            UNIQUE(insurer, product_name)
        );

        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            url TEXT NOT NULL,
            doc_type TEXT NOT NULL,
            title TEXT,
            content_hash TEXT,
            last_fetched TEXT,
            chunk_count INTEGER DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES products(id),
            UNIQUE(url)
        );

        CREATE TABLE IF NOT EXISTS chunks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            document_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            chunk_index INTEGER NOT NULL,
            section_title TEXT,
            content TEXT NOT NULL,
            token_count INTEGER,
            created_at TEXT,
            FOREIGN KEY (document_id) REFERENCES documents(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );

        CREATE TABLE IF NOT EXISTS crawl_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_date TEXT NOT NULL,
            insurer TEXT,
            status TEXT NOT NULL,
            documents_fetched INTEGER DEFAULT 0,
            documents_updated INTEGER DEFAULT 0,
            documents_failed INTEGER DEFAULT 0,
            chunks_created INTEGER DEFAULT 0,
            duration_seconds REAL,
            error_message TEXT,
            created_at TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_products_insurer ON products(insurer);
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_name ON products(product_name);
        CREATE INDEX IF NOT EXISTS idx_chunks_product ON chunks(product_id);
        CREATE INDEX IF NOT EXISTS idx_chunks_document ON chunks(document_id);
        CREATE INDEX IF NOT EXISTS idx_documents_product ON documents(product_id);
    """)
    conn.commit()
    conn.close()
    print(f"Database initialized at {DB_PATH}")


def load_products_from_config():
    """Load all products from sources.json into the products table."""
    config_path = Path(__file__).parent.parent / "config" / "sources.json"
    with open(config_path) as f:
        config = json.load(f)

    conn = get_db()
    now = datetime.utcnow().isoformat()
    count = 0

    for insurer_key, insurer_data in config["insurers"].items():
        for cat_key, cat_data in insurer_data["categories"].items():
            for product in cat_data["products"]:
                try:
                    # Upsert keyed on (insurer, product_name) preserving the existing id
                    existing = conn.execute(
                        "SELECT id FROM products WHERE insurer=? AND product_name=?",
                        (insurer_data["short_name"], product["name"]),
                    ).fetchone()
                    if existing:
                        conn.execute("""
                            UPDATE products SET plan_number=?, uin=?, category=?, product_type=?,
                            url=?, sales_status=?, last_updated=? WHERE id=?
                        """, (
                            product.get("plan", ""), product.get("uin", ""), cat_key,
                            cat_data["label"], product.get("url", ""),
                            product.get("status", "live"), now, existing["id"],
                        ))
                    else:
                        conn.execute("""
                            INSERT INTO products
                            (insurer, product_name, plan_number, uin, category, product_type,
                             url, sales_status, last_updated)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            insurer_data["short_name"], product["name"],
                            product.get("plan", ""), product.get("uin", ""),
                            cat_key, cat_data["label"], product.get("url", ""),
                            product.get("status", "live"), now,
                        ))
                    count += 1
                except Exception as e:
                    print(f"Error inserting {product['name']}: {e}")

    conn.commit()
    conn.close()
    print(f"Loaded {count} products from config")


if __name__ == "__main__":
    init_db()
    load_products_from_config()
