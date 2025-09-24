-- Update Albert's admin record to match Supabase Auth user ID
-- First, let's see what we have
SELECT 'Current admin users:' as info;
SELECT id, email, name FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- You'll need to replace 'ACTUAL_SUPABASE_USER_ID' with the real UUID from Supabase Auth
-- To get it: Go to Supabase Dashboard → Authentication → Users → find albert.perspective@studio.com → copy the ID

-- UPDATE admin_users 
-- SET id = 'ACTUAL_SUPABASE_USER_ID'
-- WHERE email = 'albert.perspective@studio.com';

-- Uncomment and run the UPDATE after getting the real Supabase user ID
