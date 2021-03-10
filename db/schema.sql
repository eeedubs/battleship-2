CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

---------------------------------------------------------------------------------

CREATE FUNCTION set_updated_at() RETURNS trigger
  LANGUAGE plpgsql
  AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END
$$;

---------------------------------------------------------------------------------

CREATE TABLE users(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  username VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT email_key UNIQUE (email)
);

---------------------------------------------------------------------------------

CREATE TABLE user_friends(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_one_id UUID NOT NULL REFERENCES users(id),
  user_two_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_friends_different_users CHECK(user_one_id != user_two_id)
);

---------------------------------------------------------------------------------

CREATE TABLE signup_invitations(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_user_id UUID NOT NULL REFERENCES users(id),
  invitee_email VARCHAR NOT NULL,
  message VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  user_id UUID REFERENCES users(id)
);

---------------------------------------------------------------------------------

CREATE TABLE json_web_tokens(
  id bytea NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + '01:00:00'::INTERVAL)
);

---------------------------------------------------------------------------------

CREATE TABLE battleship_game_invitations(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_user_id UUID NOT NULL REFERENCES users(id),
  invitee_user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  accepted_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

CREATE INDEX battleship_game_invitations_one_in_progress_per_user_pair_index ON battleship_game_invitations (invitee_user_id, inviter_user_id)
  WHERE accepted_at IS NULL
    AND declined_at IS NULL
    AND archived_at IS NULL;

CREATE FUNCTION battleship_game_invitations_prevent_new_when_game_in_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
DECLARE
  game_in_progress_exists_ BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM battleship_game_invitations AS bgi
    JOIN battleship_games AS bg ON bg.battleship_game_invitation_id = bgi.id
      AND bg.completed_at IS NULL
      AND bg.archived_at IS NULL
      AND bg.winner_user_id IS NULL
      AND bg.loser_user_id IS NULL
    WHERE bgi.inviter_user_id = new.inviter_user_id
      AND bgi.invitee_user_id = new.invitee_user_id
      AND bgi.declined_at IS NULL
      AND bgi.archived_at IS NULL
  ) INTO game_in_progress_exists_;

  IF game_in_progress_exists_ IS TRUE THEN
    RAISE EXCEPTION 'Could not create a new game invitation, players have a current game in-progress.';
  END IF;
  RETURN new;
END;
$$;

CREATE TRIGGER game_invitations_check_games_in_progress
BEFORE INSERT OR UPDATE
ON battleship_game_invitations
FOR EACH ROW EXECUTE PROCEDURE battleship_game_invitations_prevent_new_when_game_in_progress();

---------------------------------------------------------------------------------

CREATE TABLE battleship_games(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  battleship_game_invitation_id UUID NOT NULL REFERENCES battleship_game_invitations(id),
  starting_user_id UUID REFERENCES users(id),
  winner_user_id UUID REFERENCES users(id),
  loser_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  CONSTRAINT battleship_games_winner_loser_different CHECK (winner_user_id != loser_user_id)
);


CREATE TRIGGER game_invitations_check_games_in_progress
BEFORE UPDATE
ON battleship_games
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

---------------------------------------------------------------------------------

CREATE TABLE battleship_placements(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  battleship_game_id UUID NOT NULL REFERENCES battleship_games(id),
  ship_type VARCHAR NOT NULL,
  coordinates_path PATH NOT NULL
);

---------------------------------------------------------------------------------

CREATE TABLE battleship_guesses(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  battleship_game_id UUID NOT NULL REFERENCES battleship_games(id),
  guessing_user_id UUID NOT NULL REFERENCES users(id),
  targetted_user_id UUID NOT NULL REFERENCES users(id),
  coordinates_point POINT NOT NULL,
  was_successful BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE FUNCTION battleship_games_current_turn_user(battleship_game_id_ UUID)
RETURNS TABLE 
  (
    id UUID,
    email VARCHAR,
    password_hash VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR,
    created_at TIMESTAMPTZ
  )
LANGUAGE sql
AS
$$
  WITH
    current_turn_user_id AS (
      SELECT
        COALESCE(most_recent_guess.targetted_user_id, bg.starting_user_id) AS user_id
      FROM battleship_games AS bg
      LEFT JOIN battleship_guesses AS most_recent_guess ON most_recent_guess.battleship_game_id = bg.id
        AND most_recent_guess.created_at = (
          SELECT MAX(created_at)
          FROM battleship_guesses
          WHERE battleship_game_id = bg.id
        )
      WHERE bg.id = battleship_game_id_
        AND bg.completed_at IS NULL
        AND bg.winner_user_id IS NULL
        AND bg.loser_user_id IS NULL
    )
  SELECT u.*
  FROM users AS u
  JOIN current_turn_user_id ON current_turn_user_id.user_id = u.id;
$$;