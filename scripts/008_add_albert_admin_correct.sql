-- Add Albert as admin user
-- First, you need to get the actual UUID from Supabase Auth after creating the user
-- Replace 'REPLACE_WITH_ACTUAL_UUID_FROM_SUPABASE_AUTH' with the real UUID

INSERT INTO public.admin_users (
  id, 
  email, 
  password_hash, 
  name, 
  created_at, 
  updated_at
) VALUES (
  'REPLACE_WITH_ACTUAL_UUID_FROM_SUPABASE_AUTH'::uuid,
  'albert.perspective@studio.com',
  'supabase_auth_managed', -- dummy value since Supabase handles auth
  'Albert Perspective',
  NOW(),
  NOW()
);
