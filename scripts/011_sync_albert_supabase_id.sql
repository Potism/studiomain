-- Update Albert's admin record to match his Supabase Auth UUID
-- Replace 'REPLACE_WITH_SUPABASE_AUTH_UUID' with the actual UUID from Supabase Dashboard

UPDATE admin_users 
SET id = 'REPLACE_WITH_SUPABASE_AUTH_UUID'
WHERE email = 'albert.perspective@studio.com';

-- Verify the update
SELECT id, email, name FROM admin_users WHERE email = 'albert.perspective@studio.com';
