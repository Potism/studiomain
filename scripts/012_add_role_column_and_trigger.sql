-- Add role column to admin_users table
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Update existing users to have 'admin' role
UPDATE public.admin_users 
SET role = 'admin' 
WHERE email IN ('admin@perspectivestudio.com', 'contact@perspectivestudio.com', 'albert.perspective@studio.com');

-- Create function to automatically add users to admin_users when they sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, password_hash, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    'supabase_managed',
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run the function when a user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Clean up existing data - remove password_hash requirement since Supabase handles auth
ALTER TABLE public.admin_users 
ALTER COLUMN password_hash DROP NOT NULL;
