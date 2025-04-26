-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'planned', 'in_progress', 'completed', 'rejected')),
    title TEXT,
    outseta_person_uid VARCHAR NOT NULL REFERENCES outseta_user(person_uid) DEFAULT auth.jwt() ->> 'sub',
    upvotes INTEGER DEFAULT 1, -- Start with 1 upvote for the creator
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view all feedback" ON feedback;
DROP POLICY IF EXISTS "Users can create feedback" ON feedback;
DROP POLICY IF EXISTS "Users can update their own feedback" ON feedback;
DROP POLICY IF EXISTS "Users can delete their own feedback" ON feedback;

-- Create policies
CREATE POLICY "Anyone can view all feedback"
    ON feedback FOR SELECT
    USING (true);

CREATE POLICY "Users can create feedback"
    ON feedback FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);

CREATE POLICY "Users can update their own feedback"
    ON feedback FOR UPDATE
    USING (auth.jwt() ->> 'sub' = outseta_person_uid)
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);

-- Only allow soft deletes of feedback, so no delete policy
-- CREATE POLICY "Users can delete their own feedback"
--     ON feedback FOR DELETE
--     USING (auth.jwt() ->> 'sub' = outseta_person_uid);