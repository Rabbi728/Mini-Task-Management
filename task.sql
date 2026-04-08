-- Adminer 5.4.2 PostgreSQL 18.1 dump

DROP TABLE IF EXISTS "activity_logs";
DROP SEQUENCE IF EXISTS "public".activity_logs_id_seq;
CREATE SEQUENCE "public".activity_logs_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."activity_logs" (
    "id" integer DEFAULT nextval('activity_logs_id_seq') NOT NULL,
    "uuid" uuid NOT NULL,
    "record_type" character varying(16) NOT NULL,
    "details" text NOT NULL,
    "created_by" integer,
    "created_at" timestamp(3) NOT NULL,
    "updated_at" timestamp(3) NOT NULL,
    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);

CREATE UNIQUE INDEX activity_logs_uuid_key ON public.activity_logs USING btree (uuid);


DROP TABLE IF EXISTS "personal_access_tokens";
DROP SEQUENCE IF EXISTS "public".personal_access_tokens_id_seq;
CREATE SEQUENCE "public".personal_access_tokens_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."personal_access_tokens" (
    "id" integer DEFAULT nextval('personal_access_tokens_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "token" character varying(64) NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);

CREATE INDEX personal_access_tokens_token ON public.personal_access_tokens USING btree (token);


DROP TABLE IF EXISTS "tasks";
DROP SEQUENCE IF EXISTS "public".tasks_id_seq;
CREATE SEQUENCE "public".tasks_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tasks" (
    "id" integer DEFAULT nextval('tasks_id_seq') NOT NULL,
    "uuid" uuid NOT NULL,
    "title" character varying(191) NOT NULL,
    "description" text NOT NULL,
    "assigned_user" integer,
    "status" task_status NOT NULL,
    "created_by" integer,
    "created_at" timestamp(3) NOT NULL,
    "updated_at" timestamp(3) NOT NULL,
    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);

CREATE UNIQUE INDEX tasks_uuid_key ON public.tasks USING btree (uuid);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS "public".users_id_seq;
CREATE SEQUENCE "public".users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "uuid" uuid NOT NULL,
    "name" character varying(64) NOT NULL,
    "email" character varying(191) NOT NULL,
    "role" character varying(16) NOT NULL,
    "password" character varying(191) NOT NULL,
    "created_at" timestamp(3) NOT NULL,
    "updated_at" timestamp(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);

CREATE UNIQUE INDEX users_uuid_key ON public.users USING btree (uuid);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


ALTER TABLE ONLY "public"."activity_logs" ADD CONSTRAINT "activity_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

ALTER TABLE ONLY "public"."personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_assigned_user_fkey" FOREIGN KEY (assigned_user) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

-- 2026-04-07 18:35:02 UTC
