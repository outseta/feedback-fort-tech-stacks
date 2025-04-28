-- Create vote table
CREATE TABLE IF NOT EXISTS vote (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    feedback_uid UUID NOT NULL REFERENCES feedback(uid),
    outseta_person_uid VARCHAR NOT NULL DEFAULT auth.jwt() ->> 'sub',
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE vote ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own votes" ON vote;
DROP POLICY IF EXISTS "Users can create votes" ON vote;
DROP POLICY IF EXISTS "Users can update their own votes" ON vote;

-- Create policies
CREATE POLICY "Users can view their own votes"
  ON vote FOR SELECT
  USING (true);

CREATE POLICY "Users can create votes"
    ON vote FOR INSERT
    WITH CHECK (
        auth.jwt() ->> 'sub' = outseta_person_uid AND
        NOT EXISTS (
            SELECT 1 FROM vote v
            WHERE v.feedback_uid = vote.feedback_uid
            AND v.outseta_person_uid = vote.outseta_person_uid
            AND v.deleted_at IS NULL
        )
    );

CREATE POLICY "Users can update their own votes"
    ON vote FOR UPDATE
    USING (auth.jwt() ->> 'sub' = outseta_person_uid)
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);

-- Only allow soft deletes of votes, so no delete policy
-- CREATE POLICY "Users can delete their own votes"
--     ON vote FOR DELETE
--     USING (
--         auth.jwt() ->> 'sub' = outseta_person_uid AND
--         deleted_at IS NULL
--     );

-- Add unique constraint to prevent multiple active votes from same user
CREATE UNIQUE INDEX unique_active_user_vote ON vote (feedback_uid, outseta_person_uid) WHERE deleted_at IS NULL;

-- Create a view to show feedback with calculated upvotes and the current user's vote id
CREATE OR REPLACE VIEW active_feedback_with_votes AS
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