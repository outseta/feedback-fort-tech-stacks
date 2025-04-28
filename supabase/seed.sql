-- Seed feedback
INSERT INTO feedback (uid, created_at, description, status, title, outseta_person_uid) VALUES
    ('00000000-0000-0000-0000-000000000001', NOW(), 'The new feature is great but could use some improvements in the UI', 'requested', 'Improve UI for new feature', 'usr_123'),
    ('00000000-0000-0000-0000-000000000002', NOW(), 'Would love to see dark mode support', 'planned', 'Add dark mode', 'usr_456'),
    ('00000000-0000-0000-0000-000000000003', NOW(), 'The app crashes when uploading large files', 'in_progress', 'Fix file upload crash', 'usr_789'),
    ('00000000-0000-0000-0000-000000000004', NOW(), 'Add support for more file formats', 'completed', 'Additional file format support', 'usr_123'),
    ('00000000-0000-0000-0000-000000000005', NOW(), 'The search function is not working as expected', 'requested', 'Search functionality issues', 'usr_456');

-- Seed votes
INSERT INTO vote (uid, created_at, feedback_uid, outseta_person_uid) VALUES
    ('00000000-0000-0000-0000-000000000101', NOW(), '00000000-0000-0000-0000-000000000001', 'usr_456'),
    ('00000000-0000-0000-0000-000000000102', NOW(), '00000000-0000-0000-0000-000000000001', 'usr_789'),
    ('00000000-0000-0000-0000-000000000103', NOW(), '00000000-0000-0000-0000-000000000002', 'usr_123'),
    ('00000000-0000-0000-0000-000000000104', NOW(), '00000000-0000-0000-0000-000000000002', 'usr_789'),
    ('00000000-0000-0000-0000-000000000108', NOW(), '00000000-0000-0000-0000-000000000003', 'usr_123'),
    ('00000000-0000-0000-0000-000000000109', NOW(), '00000000-0000-0000-0000-000000000003', 'usr_456'),
    ('00000000-0000-0000-0000-000000000110', NOW(), '00000000-0000-0000-0000-000000000003', 'usr_789'),
    ('00000000-0000-0000-0000-000000000111', NOW(), '00000000-0000-0000-0000-000000000004', 'usr_456'),
    ('00000000-0000-0000-0000-000000000112', NOW(), '00000000-0000-0000-0000-000000000005', 'usr_123'),
    ('00000000-0000-0000-0000-000000000113', NOW(), '00000000-0000-0000-0000-000000000005', 'usr_456'),
    ('00000000-0000-0000-0000-000000000114', NOW(), '00000000-0000-0000-0000-000000000005', 'usr_789');

-- Add some soft-deleted votes to demonstrate the soft delete functionality
INSERT INTO vote (uid, created_at, feedback_uid, outseta_person_uid, deleted_at) VALUES
    ('00000000-0000-0000-0000-000000000116', NOW(), '00000000-0000-0000-0000-000000000001', 'usr_123', NOW()),
    ('00000000-0000-0000-0000-000000000117', NOW(), '00000000-0000-0000-0000-000000000002', 'usr_456', NOW()),
    ('00000000-0000-0000-0000-000000000118', NOW(), '00000000-0000-0000-0000-000000000003', 'usr_123', NOW());