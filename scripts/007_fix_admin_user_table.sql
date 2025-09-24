-- Update admin_users table to use Supabase Auth user IDs
-- First, let's see what users exist in auth.users and update the admin_users table accordingly

-- If you created the user manually in Supabase Auth, run this to add them to admin_users:
-- Replace 'your-actual-user-id' with the UUID from Supabase Auth Users table

INSERT INTO admin_users (id, email, name, created_at)
VALUES (
  'your-actual-user-id-from-supabase-auth', 
  'albert.perspective@studio.com', 
  'Albert Perspective', 
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name;
