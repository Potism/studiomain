-- Check if Albert exists and his current state
SELECT * FROM admin_users WHERE email = 'albert.perspective@studio.com';

-- Also check all admin users to see the current state
SELECT email, role, created_at FROM admin_users ORDER BY created_at DESC;
