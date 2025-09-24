-- Create a simple admin user for initial login
-- Password will be 'admin123' (hashed with bcrypt)
INSERT INTO public.admin_users (email, password_hash, name) VALUES
('admin@perspectivestudio.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQFqJPgq73wkSjmQEjqvUEjHEOHa', 'Admin User')
ON CONFLICT (email) DO UPDATE SET 
  password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjdQFqJPgq73wkSjmQEjqvUEjHEOHa',
  updated_at = NOW();
