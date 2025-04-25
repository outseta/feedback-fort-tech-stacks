-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    uid UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'planned', 'in_progress', 'completed', 'rejected')),
    title TEXT,
    outseta_user_uid VARCHAR NOT NULL REFERENCES outseta_user(uid),
    upvotes INTEGER DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all feedback" ON feedback;
DROP POLICY IF EXISTS "Users can create feedback" ON feedback;
DROP POLICY IF EXISTS "Users can update their own feedback" ON feedback;
DROP POLICY IF EXISTS "Users can delete their own feedback" ON feedback;

-- Create policies
CREATE POLICY "Users can view all feedback"
    ON feedback FOR SELECT
    USING (true);

CREATE POLICY "Users can create feedback"
    ON feedback FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_user_uid);

CREATE POLICY "Users can update their own feedback"
    ON feedback FOR UPDATE
    USING (auth.jwt() ->> 'sub' = outseta_user_uid)
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_user_uid);

CREATE POLICY "Users can delete their own feedback"
    ON feedback FOR DELETE
    USING (auth.jwt() ->> 'sub' = outseta_user_uid);