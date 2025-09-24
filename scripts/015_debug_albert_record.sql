-- Check all records in admin_users table
SELECT 'All admin_users records:' as info;
SELECT * FROM admin_users;

-- Check specifically for Albert with exact email
SELECT 'Albert lookup by exact email:' as info;
SELECT * FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- Check for any similar emails (case sensitivity, spaces, etc.)
SELECT 'Similar email patterns:' as info;
SELECT * FROM admin_users WHERE email ILIKE '%albert%' OR email ILIKE '%perspective%';

-- If Albert doesn't exist, create him
INSERT INTO admin_users (email, name, role, password_hash)
SELECT 'albert.perspective@studio.com', 'Albert Perspective', 'admin', 'supabase_auth_managed'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'albert.perspective@studio.com'
);

-- Final verification
SELECT 'Final Albert record:' as info;
SELECT * FROM admin_users WHERE email = 'albert.perspective@studio.com';
