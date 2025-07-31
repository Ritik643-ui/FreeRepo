-- TravelBuddy Database Initialization Script
-- This script is used for Docker container initialization

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE travelbuddy'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'travelbuddy')\gexec

-- Connect to the travelbuddy database
\c travelbuddy;

-- Create user if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'travelbuddy_user') THEN

      CREATE ROLE travelbuddy_user LOGIN PASSWORD 'travelbuddy_password';
   END IF;
END
$do$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE travelbuddy TO travelbuddy_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO travelbuddy_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO travelbuddy_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO travelbuddy_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO travelbuddy_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO travelbuddy_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO travelbuddy_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO travelbuddy_user;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create additional indexes for performance
-- These will be created after Flyway migrations run

-- Insert sample data for development/testing
-- This data will only be inserted if tables are empty

-- Note: The actual schema creation is handled by Flyway migrations
-- This script only handles database and user setup for Docker containers

