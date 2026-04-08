-- Adminer 5.4.2 PostgreSQL 18.1 dump

DROP TYPE IF EXISTS task_status;
CREATE TYPE task_status AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED');

DROP TABLE IF EXISTS "activity_logs";
DROP SEQUENCE IF EXISTS "public".activity_logs_id_seq1;
CREATE SEQUENCE "public".activity_logs_id_seq1 INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."activity_logs" (
    "id" integer DEFAULT nextval('activity_logs_id_seq1') NOT NULL,
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

INSERT INTO "activity_logs" ("uuid", "record_type", "details", "created_by", "created_at", "updated_at") VALUES
('a193cb24-e2ec-48a3-98dc-dba37b470d07',	'TASK',	'Created task: Autem voluptatem de',	1,	'2026-04-08 19:46:24.25',	'2026-04-08 19:46:24.25'),
('78f519b0-92c8-4091-8365-f2e48131f55b',	'TASK',	'Changed status of task "task 1" from PENDING to DONE',	1,	'2026-04-08 20:07:07.492',	'2026-04-08 20:07:07.492'),
('d381c6fe-8129-45b8-b130-28b56955bbcc',	'TASK',	'Changed status of task "task 1" from DONE to IN_PROGRESS',	1,	'2026-04-08 20:11:20.179',	'2026-04-08 20:11:20.179'),
('9f64c195-c43b-478a-8e29-eec7512e0d95',	'TASK',	'Changed status of task "task 1" from IN_PROGRESS to DONE',	1,	'2026-04-08 20:12:21.233',	'2026-04-08 20:12:21.233'),
('7a6e8d46-05c4-4393-9e1e-68e5f8ff479a',	'TASK',	'Changed status of task "task 1" from DONE to CANCELLED',	1,	'2026-04-08 20:12:25.247',	'2026-04-08 20:12:25.247'),
('c5425b06-3dae-4edf-b698-72c999b8873d',	'TASK',	'Changed status of task "task 1" from CANCELLED to IN_PROGRESS',	1,	'2026-04-09 02:44:15.983',	'2026-04-09 02:44:15.983'),
('1da7ff47-dc6f-4cf5-bec4-286625df219d',	'TASK',	'Created task: Doloribus incididunt',	1,	'2026-04-09 02:50:13.197',	'2026-04-09 02:50:13.197');

DROP TABLE IF EXISTS "personal_access_tokens";
DROP SEQUENCE IF EXISTS "public".personal_access_tokens_id_seq1;
CREATE SEQUENCE "public".personal_access_tokens_id_seq1 INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."personal_access_tokens" (
    "id" integer DEFAULT nextval('personal_access_tokens_id_seq1') NOT NULL,
    "user_id" integer NOT NULL,
    "token" character varying(64) NOT NULL,
    "expires_at" timestamp(6) NOT NULL,
    "created_at" timestamp(6) NOT NULL,
    "updated_at" timestamp(6) NOT NULL,
    CONSTRAINT "personal_access_tokens_pkey" PRIMARY KEY ("id")
)
WITH (oids = false);

CREATE INDEX personal_access_tokens_token ON public.personal_access_tokens USING btree (token);

DROP TABLE IF EXISTS "tasks";
DROP SEQUENCE IF EXISTS "public".tasks_id_seq1;
CREATE SEQUENCE "public".tasks_id_seq1 INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tasks" (
    "id" integer DEFAULT nextval('tasks_id_seq1') NOT NULL,
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

INSERT INTO "tasks" ("uuid", "title", "description", "assigned_user", "status", "created_by", "created_at", "updated_at") VALUES
('0483bb18-76bb-4205-b27b-b3b4a73d743c',	'test 2',	'Dignissimos suscipit',	6,	'IN_PROGRESS',	1,	'2026-04-08 19:06:52.057',	'2026-04-08 19:31:39.339'),
('81910538-6715-4063-8553-663ec20fd5ad',	'Autem voluptatem de',	'Modi est aspernatur',	5,	'DONE',	1,	'2026-04-08 19:46:24.164',	'2026-04-08 19:46:24.164'),
('450cfe23-0808-4b7a-84c4-189a3ffecdcd',	'task 1',	'Rem et consequatur ',	1,	'IN_PROGRESS',	NULL,	'2026-04-08 18:35:26.29',	'2026-04-09 02:44:15.932'),
('2afa120d-e006-4faa-88ce-54cbedda8427',	'Doloribus incididunt',	'Consequatur natus qu',	5,	'DONE',	1,	'2026-04-09 02:50:13.184',	'2026-04-09 02:50:13.184');

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

INSERT INTO "users" ("uuid", "name", "email", "role", "password", "created_at", "updated_at") VALUES
('4f5b5e8f-ae0b-4e9b-9c24-6268ee0155a8',	'Fuga Fugiat sequi ',	'hyca@mailinator.com',	'user',	'$2b$10$Ir7fJVXuQSDnOtqSuMa6zu0SVQP4eAY4lxJeSaQClcGl2oSDXy3K2',	'2026-04-08 06:40:02.431',	'2026-04-08 06:40:02.431'),
('cc009c75-cef0-4135-a0a4-6559a4923915',	'Consequatur Soluta ',	'xuzosyzi@mailinator.com',	'user',	'$2b$10$ibcNmiAXqNpazySX8Gwrwu70W544esOJ0aZnJsRMri9eNg9W4D0hm',	'2026-04-08 18:25:00.131',	'2026-04-08 18:25:28.436'),
('958b57f7-d751-446d-9093-54ef14c1955b',	'admin',	'admin@gmail.com',	'admin',	'$2b$10$kNFcZRi6lGXNQgjRkcHQlOaiuUPQClVsPU0go7ihj/yf/FPRX65vW',	'2026-04-08 06:22:40.164',	'2026-04-09 03:09:10.292'),
('c859646b-b4b2-45cf-aab0-86c47e6183e7',	'User',	'user@gmail.com',	'user',	'$2b$10$wmYsCeuw5D8Nn6.3ny00feXCGXno1CzWUh/u3.osCPr6L2ScwHkIy',	'2026-04-07 19:32:38.381',	'2026-04-09 03:09:35.775');

ALTER TABLE ONLY "public"."activity_logs" ADD CONSTRAINT "activity_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

ALTER TABLE ONLY "public"."personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_assigned_user_fkey" FOREIGN KEY (assigned_user) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

-- 2026-04-08 21:11:13 UTC
