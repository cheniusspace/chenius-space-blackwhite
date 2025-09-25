-- Drop existing tables if they exist
DROP TABLE IF EXISTS creations_tags;
DROP TABLE IF EXISTS creations;

-- Create creations table
CREATE TABLE creations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'archived')),
    overview JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb),
    motivation JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb),
    tools JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb, 'list', '[]'::jsonb),
    achievements JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb, 'list', '[]'::jsonb),
    downsides JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb, 'list', '[]'::jsonb),
    gallery JSONB NOT NULL DEFAULT jsonb_build_object('images', '[]'::jsonb, 'captions', '[]'::jsonb),
    future_plans JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb, 'list', '[]'::jsonb),
    conclusion JSONB NOT NULL DEFAULT jsonb_build_object('text', '', 'images', '[]'::jsonb),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tags table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tags') THEN
        CREATE TABLE tags (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    END IF;
END $$;

-- Create creations_tags junction table
CREATE TABLE creations_tags (
    creation_id UUID REFERENCES creations(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (creation_id, tag_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for creations table
DROP TRIGGER IF EXISTS update_creations_updated_at ON creations;
CREATE TRIGGER update_creations_updated_at
    BEFORE UPDATE ON creations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 