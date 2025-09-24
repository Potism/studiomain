-- Create website content table for dynamic content management
CREATE TABLE IF NOT EXISTS public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'json', 'number')),
  updated_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Insert default website content
INSERT INTO public.website_content (section, key, value, content_type) VALUES
('hero', 'title', 'Perspective Studio', 'text'),
('hero', 'subtitle', 'Creative Visual Solutions', 'text'),
('hero', 'description', 'Professional photography and videography services that bring your vision to life with stunning visual storytelling.', 'text'),
('stats', 'projects_completed', '500', 'number'),
('stats', 'happy_clients', '200', 'number'),
('stats', 'years_experience', '8', 'number'),
('stats', 'awards_won', '15', 'number'),
('contact', 'email', 'contact@perspectivestudio.com', 'text'),
('contact', 'phone', '+1 (555) 123-4567', 'text'),
('contact', 'address', 'Los Angeles, CA', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Create index for faster content lookups
CREATE INDEX IF NOT EXISTS idx_website_content_section ON public.website_content(section);
