-- MODEL.sql - ER/SQL model (extracted from docs/raw)
-- Backend stack: Spring Boot + Kotlin

BEGIN;

CREATE TABLE IF NOT EXISTS insurers (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	address TEXT,
	inn TEXT,
	ogrn TEXT,
	phone TEXT,
	email TEXT,
	website TEXT,
	contract_number TEXT,
	contract_signed_at DATE,
	contract_ends_at DATE,
	status TEXT,
	processed_at DATE,
	comment TEXT
);

CREATE TABLE IF NOT EXISTS clients (
	id TEXT PRIMARY KEY,
	last_name TEXT NOT NULL,
	first_name TEXT NOT NULL,
	middle_name TEXT,
	birth_date DATE,
	gender TEXT,
	address TEXT,
	phone TEXT,
	email TEXT,
	password_hash TEXT,
	consent_accepted_at TIMESTAMPTZ,
	privacy_policy_accepted_at TIMESTAMPTZ,
	employer_name TEXT,
	employer_position TEXT,
	insurer_id TEXT REFERENCES insurers(id),
	insurer_name TEXT,
	policy_number TEXT,
	policy_start_date DATE,
	policy_end_date DATE,
	program_name TEXT,
	program_scope TEXT,
	payment_type TEXT,
	consultations_count INTEGER,
	extra_conditions TEXT,
	avatar_url TEXT,
	status TEXT,
	processed_at DATE,
	comment TEXT
);

CREATE TABLE IF NOT EXISTS specialists (
	id TEXT PRIMARY KEY,
	last_name TEXT NOT NULL,
	first_name TEXT NOT NULL,
	middle_name TEXT,
	birth_date DATE,
	birth_place TEXT,
	passport_number TEXT,
	passport_issued_by TEXT,
	passport_issued_at DATE,
	passport_dept_code TEXT,
	gender TEXT,
	address TEXT,
	phone TEXT,
	email TEXT,
	inn TEXT,
	directions TEXT,
	education TEXT,
	additional_education TEXT,
	hired_at DATE,
	fired_at DATE,
	status TEXT,
	processed_at DATE,
	comment TEXT
);

CREATE TABLE IF NOT EXISTS questionnaires (
	id TEXT PRIMARY KEY,
	client_id TEXT REFERENCES clients(id),
	title TEXT,
	category TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
	-- TODO: define questionnaire structure and answers storage
);

CREATE TABLE IF NOT EXISTS recommendations (
	id TEXT PRIMARY KEY,
	client_id TEXT REFERENCES clients(id),
	specialist_id TEXT REFERENCES specialists(id),
	appointment_id TEXT REFERENCES appointments(id),
	text TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recommendation_files (
	id TEXT PRIMARY KEY,
	recommendation_id TEXT REFERENCES recommendations(id),
	file_name TEXT,
	file_type TEXT,
	file_url TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
	id TEXT PRIMARY KEY,
	client_id TEXT REFERENCES clients(id),
	event TEXT,
	send_at TIMESTAMPTZ,
	channel TEXT,
	message TEXT
);

CREATE TABLE IF NOT EXISTS chats (
	id TEXT PRIMARY KEY,
	title TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
	-- TODO: define participants relation
);

CREATE TABLE IF NOT EXISTS chat_participants (
	chat_id TEXT REFERENCES chats(id),
	participant_id TEXT NOT NULL,
	role TEXT,
	PRIMARY KEY (chat_id, participant_id)
);

CREATE TABLE IF NOT EXISTS chat_messages (
	id TEXT PRIMARY KEY,
	chat_id TEXT REFERENCES chats(id),
	sender_id TEXT,
	text TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
	id TEXT PRIMARY KEY,
	client_id TEXT REFERENCES clients(id),
	specialist_id TEXT REFERENCES specialists(id),
	start_at TIMESTAMPTZ
	-- TODO: link to external calendar event
);

CREATE TABLE IF NOT EXISTS appointment_records (
	id TEXT PRIMARY KEY,
	appointment_id TEXT REFERENCES appointments(id),
	video_url TEXT,
	transcript_url TEXT,
	created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;
