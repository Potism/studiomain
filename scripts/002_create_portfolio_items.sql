-- Create portfolio items table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Studio Photography',
    'Product Photography', 
    'Commercial Video',
    'Event Photography',
    'Portrait Photography',
    'Brand Photography',
    'Creative Content'
  )),
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video')),
  file_size INTEGER,
  blob_pathname TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON public.portfolio_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_created ON public.portfolio_items(created_at DESC);
