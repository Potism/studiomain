-- Update contact submissions table to include new fields
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS service TEXT,
ADD COLUMN IF NOT EXISTS budget TEXT,
ADD COLUMN IF NOT EXISTS preferred_date DATE,
ADD COLUMN IF NOT EXISTS preferred_time TEXT,
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update the message column to allow NULL (since it's optional)
ALTER TABLE public.contact_submissions 
ALTER COLUMN message DROP NOT NULL;

-- Add check constraint for service field
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT check_service CHECK (
  service IS NULL OR 
  service IN ('social-ads', 'photo-video', 'wedding', 'complete', 'consultation')
);

-- Add check constraint for budget field
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT check_budget CHECK (
  budget IS NULL OR 
  budget IN ('500-1000', '1000-2500', '2500-5000', '5000+', 'discuss')
);

-- Add check constraint for preferred_time field
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT check_preferred_time CHECK (
  preferred_time IS NULL OR 
  preferred_time IN ('morning', 'afternoon', 'evening')
);

-- Create indexes for the new fields
CREATE INDEX IF NOT EXISTS idx_contact_service ON public.contact_submissions(service);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON public.contact_submissions(submitted_at DESC);
