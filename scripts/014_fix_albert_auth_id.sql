-- First, let's see what Albert's actual Supabase Auth ID is
-- and update the admin_users table to match it

-- Check current Albert record
SELECT id, email, role FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- Delete the current Albert record (we'll recreate it with correct ID)
DELETE FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- The trigger will automatically create a new record when Albert logs in
-- with his actual Supabase Auth ID, then we'll update his role to admin
