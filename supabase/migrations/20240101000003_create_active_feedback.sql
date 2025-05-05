-- Create a view to show feedback with calculated upvotes and the current user's vote id
CREATE OR REPLACE VIEW active_feedback_with_votes WITH (security_invoker = true) AS
SELECT
  f.*,
  (
    SELECT COUNT(*)
    FROM vote v
    WHERE v.feedback_uid = f.uid AND v.deleted_at IS NULL
  ) AS upvotes,
  (
    SELECT v.uid
    FROM vote v
    WHERE v.feedback_uid = f.uid
      AND v.outseta_person_uid = auth.jwt() ->> 'sub'
      AND v.deleted_at IS NULL
    LIMIT 1
  ) AS user_vote_id,
  (f.outseta_person_uid = auth.jwt() ->> 'sub') AS is_user_feedback
FROM feedback f
WHERE f.deleted_at IS NULL;