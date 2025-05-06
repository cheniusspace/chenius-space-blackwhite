-- Update creations table structure
ALTER TABLE creations
  DROP COLUMN description,
  DROP COLUMN image_url,
  ADD COLUMN featured_image TEXT,
  ADD COLUMN overview JSONB,
  ADD COLUMN motivation JSONB,
  ADD COLUMN tools JSONB,
  ADD COLUMN achievements JSONB,
  ADD COLUMN downsides JSONB,
  ADD COLUMN gallery JSONB,
  ADD COLUMN future_plans JSONB,
  ADD COLUMN conclusion JSONB;

