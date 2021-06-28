CREATE TABLE public.user_audits (
  changed_on timestamp(6) without time zone NOT NULL,
  approved boolean NOT NULL,
  isadmin boolean NOT NULL,
  avatar character varying NULL,
  course_id uuid NOT NULL,
  birth_date timestamp(6) without time zone NOT NULL,
  email character varying NOT NULL,
  password character varying NOT NULL,
  name character varying NOT NULL,
  username character varying NOT NULL,
  user_id uuid NOT NULL,
  id integer NOT NULL
);