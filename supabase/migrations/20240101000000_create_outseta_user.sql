-- Create outseta_user table
CREATE TABLE IF NOT EXISTS outseta_user (
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    person_uid VARCHAR NOT NULL PRIMARY KEY DEFAULT auth.jwt() ->> 'sub',
    avatar_src VARCHAR NOT NULL
);

-- Enable RLS
ALTER TABLE outseta_user ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view all outseta users" ON outseta_user;
DROP POLICY IF EXISTS "Users can create their own outseta user record" ON outseta_user;
DROP POLICY IF EXISTS "Users can update their own outseta user record" ON outseta_user;
DROP POLICY IF EXISTS "Users can delete their own outseta user record" ON outseta_user;

-- Create policies
CREATE POLICY "Users can view all outseta users"
    ON outseta_user FOR SELECT
    USING (true);

-- Users should not be able to create their own outseta user record
CREATE POLICY "Users can create their own outseta user record"
    ON outseta_user FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = person_uid);

-- Users should not be able to update their own outseta user record
CREATE POLICY "Users can update their own outseta user record"
    ON outseta_user FOR UPDATE
    USING (auth.jwt() ->> 'sub' = person_uid)
    WITH CHECK (auth.jwt() ->> 'sub' = person_uid);

-- Users should not be able to delete their own outseta user record
-- CREATE POLICY "Users can delete their own outseta user record"
--     ON outseta_user FOR DELETE
--     USING (auth.jwt() ->> 'sub' = person_uid);