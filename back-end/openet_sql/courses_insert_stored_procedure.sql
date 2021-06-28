CREATE OR REPLACE FUNCTION insertCourse(
  course character varying,
  time_course numeric
)
RETURNS void 
language plpgsql
AS
$$
	BEGIN
		INSERT INTO courses(id, course, time_course, created_at, updated_at)
    	VALUES((select uuid_generate_v1()), course, time_course, now(), now());
	END;
$$;