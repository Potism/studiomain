-- Check if role column exists and Albert's current status
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
  AND table_schema = 'public';

-- Check Albert's current record
SELECT * FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- If Albert exists but doesn't have admin role, update it
UPDATE admin_users 
SET role = 'admin' 
WHERE email = 'albert.perspective@studio.com' 
  AND (role IS NULL OR role != 'admin');

-- Verify the update
SELECT * FROM admin_users WHERE email = 'albert.perspective@studio.com';
