
--  Activar extencion de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Crear un esquema dedicado para la app
-- CREATE SCHEMA IF NOT EXISTS education AUTHORIZATION toby;


-- Crear un rol de solo lectura
-- DO
-- $$
-- BEGIN 
--  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'readonly') THEN
--    CREATE ROLE readonly LOGIN PASSWORD 'readonly3312';
--    GRANT CONNECT ON DATABASE codeducation TO readonly;
--    GRANT USAGE ON SCHEMA education TO readonly;
--    GRANT SELECT ON ALL TABLES IN SCHEMA education TO readonly;
--    ALTER DEFAULT PRIVILEGES IN SCHEMA education GRANT SELECT ON TABLES TO readonly;
--  END IF;
-- END
-- $$;

-- seteear esquema por defecto para el usuario de la app
-- ALTER ROLE toby SET search_path TO education, public;