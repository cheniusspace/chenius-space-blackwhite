-- Remove all data from creations-related tables
DELETE FROM creations_tags;
DELETE FROM creations;

-- Reset sequences if they exist
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'creations_id_seq') THEN
        ALTER SEQUENCE creations_id_seq RESTART WITH 1;
    END IF;
END $$; 