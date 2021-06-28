create OR REPLACE function validate_email(user_email varchar)
returns bool
language plpgsql
as
$$
begin
   IF user_email ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' THEN
    RETURN TRUE;
   END IF;
    RETURN FALSE;
end;
$$;