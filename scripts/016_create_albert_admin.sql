-- Create Albert's admin record
INSERT INTO admin_users (email, name, role, password_hash)
VALUES (
  'albert.perspective@studio.com',
  'Albert Perspective', 
  'admin',
  'supabase_auth_managed'
)
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  name = 'Albert Perspective',
  updated_at = now();

-- Verify Albert was created
SELECT id, email, name, role, created_at 
FROM admin_users 
WHERE email = 'albert.perspective@studio.com';
