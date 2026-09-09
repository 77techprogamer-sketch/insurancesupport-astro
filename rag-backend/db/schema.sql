-- Insurance RAG Database Schema
-- PostgreSQL + pgvector

CREATE EXTENSION IF NOT EXISTS vector;

-- Insurers table
CREATE TABLE IF NOT EXISTS insurers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    domain VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    insurer_id INTEGER NOT NULL REFERENCES insurers(id),
    product_name VARCHAR(500) NOT NULL,
    product_family VARCHAR(200),
    segment VARCHAR(200),
    sales_status VARCHAR(50) DEFAULT 'active',  -- active, withdrawn, pending
    source_url TEXT,
    effective_date DATE,
    last_seen_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(insurer_id, product_name)
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    document_type VARCHAR(100) NOT NULL,  -- product_detail, brochure, policy_wording, faq, rider
    file_url TEXT NOT NULL,
    version_hash VARCHAR(64),  -- SHA256
    fetched_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(product_id, document_type, version_hash)
);

-- Chunks table with pgvector embedding
CREATE TABLE IF NOT EXISTS chunks (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id),
    chunk_text TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    embedding VECTOR(384),  -- sentence-transformers all-MiniLM-L6-v2 dimension
    metadata JSONB,  -- insurer, product_name, product_family, segment, document_type, source_url
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_insurer ON products(insurer_id);
CREATE INDEX IF NOT EXISTS idx_products_family ON products(product_family);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(sales_status);
CREATE INDEX IF NOT EXISTS idx_documents_product ON documents(product_id);
CREATE INDEX IF NOT EXISTS idx_chunks_document ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- BM25 keyword search support (GIN index on metadata)
CREATE INDEX IF NOT EXISTS idx_chunks_metadata ON chunks USING gin (metadata);
CREATE INDEX IF NOT EXISTS idx_chunks_text ON chunks USING gin (to_tsvector('english', chunk_text));

-- Seed initial insurers
INSERT INTO insurers (name, domain) VALUES
    ('LIC', 'licindia.in'),
    ('ICICI Lombard', 'icicilombard.com'),
    ('Care Health Insurance', 'careinsurance.com')
ON CONFLICT (name) DO NOTHING;
