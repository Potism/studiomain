-- Create Albert as admin user
-- Replace 'your-user-id-here' with the actual UUID from Supabase Auth
INSERT INTO admin_users (id, email, password_hash, name, created_at)
VALUES ('your-user-id-here', 'albert.perspective@studio.com', 'supabase-auth', 'Albert Perspective', NOW());
