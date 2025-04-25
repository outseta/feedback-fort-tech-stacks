-- Create vote table
CREATE TABLE IF NOT EXISTS vote (
    uid UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    feedback_uid UUID NOT NULL REFERENCES feedback(uid),
    outseta_user_uid VARCHAR NOT NULL REFERENCES outseta_user(uid),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE vote ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all votes" ON vote;
DROP POLICY IF EXISTS "Users can create votes" ON vote;
DROP POLICY IF EXISTS "Users can update their own votes" ON vote;

-- Create policies
CREATE POLICY "Users can view all votes"
    ON vote FOR SELECT
    USING (true);

CREATE POLICY "Users can create votes"
    ON vote FOR INSERT
    WITH CHECK (
        auth.jwt() ->> 'sub' = outseta_user_uid AND
        NOT EXISTS (
            SELECT 1 FROM vote v
            WHERE v.feedback_uid = vote.feedback_uid
            AND v.outseta_user_uid = vote.outseta_user_uid
            AND v.deleted_at IS NULL
        )
    );

CREATE POLICY "Users can update their own votes"
    ON vote FOR UPDATE
    USING (
        auth.jwt() ->> 'sub' = outseta_user_uid AND
        deleted_at IS NULL
    )
    WITH CHECK (
        auth.jwt() ->> 'sub' = outseta_user_uid AND
        deleted_at IS NULL
    );

-- Only allow soft deletes
-- CREATE POLICY "Users can delete their own votes"
--     ON vote FOR DELETE
--     USING (
--         auth.jwt() ->> 'sub' = outseta_user_uid AND
--         deleted_at IS NULL
--     );

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION update_feedback_votes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE feedback
        SET upvotes = (
            SELECT COUNT(*)
            FROM vote
            WHERE feedback_uid = NEW.feedback_uid
            AND deleted_at IS NULL
        )
        WHERE uid = NEW.feedback_uid;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
            -- Vote was soft deleted
            UPDATE feedback
            SET upvotes = upvotes - 1
            WHERE uid = NEW.feedback_uid;
        ELSIF OLD.deleted_at IS NOT NULL AND NEW.deleted_at IS NULL THEN
            -- Vote was restored
            UPDATE feedback
            SET upvotes = upvotes + 1
            WHERE uid = NEW.feedback_uid;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.deleted_at IS NULL THEN
            -- Only count if the vote wasn't already soft deleted
            UPDATE feedback
            SET upvotes = upvotes - 1
            WHERE uid = OLD.feedback_uid;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for vote counting
DROP TRIGGER IF EXISTS update_feedback_votes_trigger ON vote;
CREATE TRIGGER update_feedback_votes_trigger
AFTER INSERT OR UPDATE OR DELETE ON vote
FOR EACH ROW EXECUTE FUNCTION update_feedback_votes();

-- Add unique constraint to prevent multiple active votes from same user
CREATE UNIQUE INDEX unique_active_user_vote ON vote (feedback_uid, outseta_user_uid) WHERE deleted_at IS NULL;