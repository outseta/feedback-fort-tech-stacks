-- Create outseta_user table
CREATE TABLE IF NOT EXISTS outseta_user (
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    uid VARCHAR NOT NULL PRIMARY KEY,
    avatar_src VARCHAR NOT NULL,
    name VARCHAR NOT NULL
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

CREATE POLICY "Users can create their own outseta user record"
    ON outseta_user FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = uid);

CREATE POLICY "Users can update their own outseta user record"
    ON outseta_user FOR UPDATE
    USING (auth.jwt() ->> 'sub' = uid)
    WITH CHECK (auth.jwt() ->> 'sub' = uid);

CREATE POLICY "Users can delete their own outseta user record"
    ON outseta_user FOR DELETE
    USING (auth.jwt() ->> 'sub' = uid);