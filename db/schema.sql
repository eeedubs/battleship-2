CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE users(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  user_name VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT email_key UNIQUE (email)
);

CREATE TABLE games(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_user_id uuid REFERENCES users,
  invitee_user_id uuid REFERENCES users,
  winner_user_id uuid REFERENCES users,
  loser_user_id uuid REFERENCES users,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  CONSTRAINT games_different_players CHECK (inviter_user_id != invitee_user_id),
  CONSTRAINT games_different_winner_and_loser CHECK (winner_user_id != loser_user_id)
);

CREATE TABLE placements(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  game_id uuid NOT NULL REFERENCES games(id),
  ship_type VARCHAR NOT NULL,
  coordinates_path PATH NOT NULL
);

CREATE TABLE guesses(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid NOT NULL REFERENCES games(id),
  guessing_user_id uuid NOT NULL REFERENCES users(id),
  targetted_user_id uuid NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  coordinates_point POINT NOT NULL,
  was_successful BOOLEAN DEFAULT false
);

CREATE TABLE json_web_tokens(
  id bytea NOT NULL PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + '01:00:00'::INTERVAL)
);

CREATE TABLE game_invitations(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_user_id uuid NOT NULL REFERENCES users(id),
  invitee_user_id uuid REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);
