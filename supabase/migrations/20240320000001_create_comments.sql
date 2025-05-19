-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    feedback_uid UUID NOT NULL REFERENCES feedback(uid),
    outseta_person_uid VARCHAR NOT NULL DEFAULT auth.jwt() ->> 'sub',
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update their comments" ON comments;

-- Create policies
CREATE POLICY "Anyone can view comments"
    ON comments FOR SELECT
    USING (
        deleted_at IS NULL
        OR
        auth.jwt() ->> 'sub' = outseta_person_uid
    );

CREATE POLICY "Users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);

CREATE POLICY "Users can update their comments"
    ON comments FOR UPDATE
    USING (auth.jwt() ->> 'sub' = outseta_person_uid)
    WITH CHECK (auth.jwt() ->> 'sub' = outseta_person_uid);