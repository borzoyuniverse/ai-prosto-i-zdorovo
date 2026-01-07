-- MODEL.sql — ER/SQL model template

BEGIN;

CREATE TABLE IF NOT EXISTS app_settings (
	key TEXT PRIMARY KEY,
	value TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
