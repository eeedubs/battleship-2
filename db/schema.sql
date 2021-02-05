CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE users(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  user_name VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE game_statuses(
  id INTEGER NOT NULL PRIMARY KEY,
  status VARCHAR NOT NULL
);

CREATE TABLE games(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  player_1_id uuid REFERENCES users,
  player_2_id uuid REFERENCES users,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status INTEGER NOT NULL REFERENCES game_statuses DEFAULT 0
);

CREATE TABLE placements(
  id INTEGER NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users,
  game_id uuid NOT NULL REFERENCES games,
  ship_type VARCHAR NOT NULL,
  coordinates_path PATH NOT NULL
);

CREATE TABLE guesses(
  id INTEGER NOT NULL PRIMARY KEY,
  game_id uuid NOT NULL REFERENCES games,
  guessing_user_id uuid NOT NULL REFERENCES users,
  targetted_user_id uuid NOT NULL REFERENCES users,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  coordinates_point POINT NOT NULL,
  was_successful BOOLEAN DEFAULT false
);

CREATE TABLE json_web_tokens(
  id bytea NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + '01:00:00'::INTERVAL)
)
