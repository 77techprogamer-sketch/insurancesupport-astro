-- schema.sql
-- Table structure for capturing all website inquiries, contact requests, and newsletter signups.

CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,                -- 'contact_form', 'newsletter', 'lead_magnet'
    name TEXT,
    email TEXT,
    phone TEXT,
    category TEXT,
    message TEXT,
    magnet_slug TEXT,
    ip TEXT,
    user_agent TEXT,
    referer TEXT,
    data TEXT,                         -- Full JSON dump of original payload
    created_at TEXT NOT NULL
);

-- Index for fast lookup by type, creation time, or phone
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
