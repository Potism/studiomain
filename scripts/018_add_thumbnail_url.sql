-- Add thumbnail_url field to portfolio_items table for video thumbnails
ALTER TABLE public.portfolio_items 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add comment to explain the field
COMMENT ON COLUMN public.portfolio_items.thumbnail_url IS 'URL to thumbnail image for video files. Used for video preview in gallery.';

