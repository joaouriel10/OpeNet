create OR REPLACE function validate_full_name(user_full_name varchar)
returns bool
language plpgsql
as
$$
begin
   IF user_full_name ~* '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$' THEN
    RETURN TRUE;
   END IF;
    RETURN FALSE;
end;
$$;