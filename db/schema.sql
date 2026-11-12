-- D1 schema for the site's lead capture (binding: LEADS_DB in wrangler.toml).
-- The Pages Function creates this table on first write if it is missing, but
-- running it once by hand is faster and avoids the retry:
--   wrangler d1 execute insurance_leads_db --remote --file=db/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY,
  lead_type   TEXT NOT NULL DEFAULT 'magnet',   -- magnet | callback | quiz | contact
  magnet_slug TEXT,
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  source      TEXT,                             -- e.g. compare:policybazaar-alternative
  ip          TEXT,
  user_agent  TEXT,
  referer     TEXT,
  data        TEXT,                             -- full JSON payload
  category    TEXT,                             -- contact/enquiry category chosen in the form
  message     TEXT,                             -- free-text enquiry body
  notified    INTEGER DEFAULT 0,                -- 1 when a webhook/email alert went out
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created  ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type     ON leads (lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_source   ON leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_phone    ON leads (phone);
