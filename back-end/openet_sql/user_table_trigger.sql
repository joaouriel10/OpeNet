CREATE OR REPLACE FUNCTION log_user_update_changes()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	
    INSERT INTO user_audits(user_id, username, name, password, email, birth_date, course_id, avatar, isAdmin, approved, changed_on)
    VALUES(OLD.id, OLD.username, OLD.name, OLD.password, OLD.email, OLD.birth_date, OLD.course_id, OLD.avatar, OLD."isAdmin", OLD.approved, now());
	
    RETURN NEW;
END;
$$

CREATE TRIGGER user_changes_trigger
BEFORE UPDATE
ON users
FOR EACH ROW
EXECUTE PROCEDURE log_user_update_changes();