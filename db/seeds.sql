INSERT INTO users
  (id, email, password_hash, first_name, last_name, username)
VALUES
-- primary
  ('0005826c-3319-46b3-9ffc-00d18931b101', 'test101@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test101', 'User101', 'username_101'),
  -- has games in progress
  ('0005826c-3319-46b3-9ffc-00d18931b201', 'test201@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test201', 'User201', 'username_201'),
  ('0005826c-3319-46b3-9ffc-00d18931b202', 'test202@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test202', 'User202', 'username_202'),
  ('0005826c-3319-46b3-9ffc-00d18931b203', 'test203@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test203', 'User203', 'username_203'),
  ('0005826c-3319-46b3-9ffc-00d18931b204', 'test204@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test204', 'User204', 'username_204'),
  -- has games completed
  ('0005826c-3319-46b3-9ffc-00d18931b301', 'test301@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test301', 'User301', 'username_301'),
  ('0005826c-3319-46b3-9ffc-00d18931b302', 'test302@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test302', 'User302', 'username_302'),
  ('0005826c-3319-46b3-9ffc-00d18931b303', 'test303@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test303', 'User303', 'username_303'),
  ('0005826c-3319-46b3-9ffc-00d18931b304', 'test304@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test304', 'User304', 'username_304'),
  -- has game invitations
  ('0005826c-3319-46b3-9ffc-00d18931b401', 'test401@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test401', 'User401', 'username_401'),
  ('0005826c-3319-46b3-9ffc-00d18931b402', 'test402@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test402', 'User402', 'username_402'),
  ('0005826c-3319-46b3-9ffc-00d18931b403', 'test403@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test403', 'User403', 'username_403'),
  ('0005826c-3319-46b3-9ffc-00d18931b404', 'test404@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test404', 'User404', 'username_404'),
  ('0005826c-3319-46b3-9ffc-00d18931b405', 'test405@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test405', 'User405', 'username_405'),
  ('0005826c-3319-46b3-9ffc-00d18931b406', 'test406@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test406', 'User406', 'username_406'),
  ('0005826c-3319-46b3-9ffc-00d18931b407', 'test407@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test407', 'User407', 'username_407'),
  ('0005826c-3319-46b3-9ffc-00d18931b408', 'test408@test.test', '$2b$10$cZtbGIwSufBQRuPq4v8dqOsvEt4w3WvUszVbrGZMTpv8HV84hS9vC', 'Test408', 'User408', 'username_408');

INSERT INTO user_friends
  (user_one_id, user_two_id)
VALUES
  -- has games in progress
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b201'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b202'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b203'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b204'),
  -- has games completed
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b301'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b302'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b303'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b304'),
  -- has game invitations
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b401'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b402'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b403'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b404'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b405'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b406'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b407'),
  ('0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b408');

INSERT INTO battleship_game_invitations
  (id, inviter_user_id, invitee_user_id, created_at, accepted_at, declined_at, archived_at)
VALUES
-- games in progress
  ('00056998-e784-4504-a3fc-02c10474a21a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b201', now() ::TIMESTAMPTZ, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a22a', '0005826c-3319-46b3-9ffc-00d18931b202', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '1 hour' ::INTERVAL, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a23a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b203', now() ::TIMESTAMPTZ - '2 hours' ::INTERVAL, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a24a', '0005826c-3319-46b3-9ffc-00d18931b204', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '3 hours' ::INTERVAL, now(), NULL, NULL),
  -- games completed
  ('00056998-e784-4504-a3fc-02c10474a31a', '0005826c-3319-46b3-9ffc-00d18931b301', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a32a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b302', now() ::TIMESTAMPTZ - '1 hour' ::INTERVAL, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a33a', '0005826c-3319-46b3-9ffc-00d18931b303', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '2 hours' ::INTERVAL, now(), NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a34a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b304', now() ::TIMESTAMPTZ - '3 hours' ::INTERVAL, now(), NULL, NULL),
  -- invites pending
  ('00056998-e784-4504-a3fc-02c10474a41a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b401', now() ::TIMESTAMPTZ, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a42a', '0005826c-3319-46b3-9ffc-00d18931b402', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '1 hour' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a43a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b403', now() ::TIMESTAMPTZ - '2 hours' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a44a', '0005826c-3319-46b3-9ffc-00d18931b404', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '3 hours' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a45a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b405', now() ::TIMESTAMPTZ - '4 hours' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a46a', '0005826c-3319-46b3-9ffc-00d18931b406', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '5 hours' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a47a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b407', now() ::TIMESTAMPTZ - '6 hours' ::INTERVAL, NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a48a', '0005826c-3319-46b3-9ffc-00d18931b408', '0005826c-3319-46b3-9ffc-00d18931b101', now() ::TIMESTAMPTZ - '7 hours' ::INTERVAL, NULL, NULL, NULL);

INSERT INTO battleship_games
  (battleship_game_invitation_id, starting_user_id, winner_user_id, completed_at, archived_at)
VALUES
  -- games in progress
  ('00056998-e784-4504-a3fc-02c10474a21a', '0005826c-3319-46b3-9ffc-00d18931b101', NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a22a', '0005826c-3319-46b3-9ffc-00d18931b202', NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a23a', '0005826c-3319-46b3-9ffc-00d18931b101', NULL, NULL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a24a', '0005826c-3319-46b3-9ffc-00d18931b204', NULL, NULL, NULL),
  -- games completed
  ('00056998-e784-4504-a3fc-02c10474a31a', '0005826c-3319-46b3-9ffc-00d18931b301', '0005826c-3319-46b3-9ffc-00d18931b301', now(), NULL),
  ('00056998-e784-4504-a3fc-02c10474a32a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b101', now() - '1 hour' ::INTERVAL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a33a', '0005826c-3319-46b3-9ffc-00d18931b303', '0005826c-3319-46b3-9ffc-00d18931b303', now() - '2 hours' ::INTERVAL, NULL),
  ('00056998-e784-4504-a3fc-02c10474a34a', '0005826c-3319-46b3-9ffc-00d18931b101', '0005826c-3319-46b3-9ffc-00d18931b101', now() - '3 hours' ::INTERVAL, NULL);
