CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION insertUser(
  "isAdmin" boolean,
  avatar character varying,
  course_id uuid,
  birth_date timestamp without time zone,
  email character varying,
  password character varying,
  username character varying,
  name character varying
)
RETURNS void 
language plpgsql
AS
$$
	BEGIN
		INSERT INTO users(id, username, name, password, email, birth_date, course_id, avatar, "isAdmin", approved, created_at, updated_at)
    	VALUES((select uuid_generate_v1()), username, name, password, email, birth_date, course_id, avatar, "isAdmin", FALSE, now(), now());
	END;
$$;