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

INSERT INTO "activity_logs" ("id", "uuid", "record_type", "details", "created_by", "created_at", "updated_at") VALUES
(1,	'a193cb24-e2ec-48a3-98dc-dba37b470d07',	'TASK',	'Created task: Autem voluptatem de',	1,	'2026-04-08 19:46:24.25',	'2026-04-08 19:46:24.25'),
(2,	'78f519b0-92c8-4091-8365-f2e48131f55b',	'TASK',	'Changed status of task "task 1" from PENDING to DONE',	1,	'2026-04-08 20:07:07.492',	'2026-04-08 20:07:07.492'),
(3,	'd381c6fe-8129-45b8-b130-28b56955bbcc',	'TASK',	'Changed status of task "task 1" from DONE to IN_PROGRESS',	1,	'2026-04-08 20:11:20.179',	'2026-04-08 20:11:20.179'),
(4,	'9f64c195-c43b-478a-8e29-eec7512e0d95',	'TASK',	'Changed status of task "task 1" from IN_PROGRESS to DONE',	1,	'2026-04-08 20:12:21.233',	'2026-04-08 20:12:21.233'),
(5,	'7a6e8d46-05c4-4393-9e1e-68e5f8ff479a',	'TASK',	'Changed status of task "task 1" from DONE to CANCELLED',	1,	'2026-04-08 20:12:25.247',	'2026-04-08 20:12:25.247'),
(6,	'c5425b06-3dae-4edf-b698-72c999b8873d',	'TASK',	'Changed status of task "task 1" from CANCELLED to IN_PROGRESS',	1,	'2026-04-09 02:44:15.983',	'2026-04-09 02:44:15.983'),
(7,	'1da7ff47-dc6f-4cf5-bec4-286625df219d',	'TASK',	'Created task: Doloribus incididunt',	1,	'2026-04-09 02:50:13.197',	'2026-04-09 02:50:13.197');

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

INSERT INTO "personal_access_tokens" ("id", "user_id", "token", "expires_at", "created_at", "updated_at") VALUES
(1,	1,	'23fa7b2751d3b6f71c46ec5bfe2068eb9abae1b81fdb19744ddcd9d6756341da',	'2026-04-09 07:11:05.766',	'2026-04-08 07:11:05.768',	'2026-04-08 07:11:05.768'),
(2,	1,	'555dba322bd057226662f534c61396120cd8fc1b6d3969cab520cf613762b371',	'2026-04-09 07:12:38.591',	'2026-04-08 07:12:38.591',	'2026-04-08 07:12:38.591'),
(3,	1,	'7e87ff6d1fe26943f9df888ae074ecd4c56554308ee64ffdb44a745390244d9f',	'2026-04-09 07:14:03.654',	'2026-04-08 07:14:03.654',	'2026-04-08 07:14:03.654'),
(4,	1,	'e4aad5773833c9b63fadde779380f2713457d51d5d302d6c958bbdb066195b52',	'2026-04-09 07:14:28.737',	'2026-04-08 07:14:28.738',	'2026-04-08 07:14:28.738'),
(5,	1,	'7ba8ed4e67cab0b537f38d726a27d4d268f85f850b1b5f91acdbf4841c888884',	'2026-04-09 11:35:40.844',	'2026-04-08 11:35:40.85',	'2026-04-08 11:35:40.85'),
(6,	1,	'c506189d2dbe13d6707dcf61432e3ab1f162c73605005c39b186dbccdf3f8a21',	'2026-04-09 17:12:55.585',	'2026-04-08 17:12:55.586',	'2026-04-08 17:12:55.586'),
(7,	1,	'8521fa4adafc465710a047ffe196e434e6cce5dd8c4b378a663d934158ff702c',	'2026-04-09 17:13:12.412',	'2026-04-08 17:13:12.412',	'2026-04-08 17:13:12.412'),
(8,	1,	'd9d277d03c79ba16b68b1040c9fdec04a013d1a4a2bef477060beee76e410aa3',	'2026-04-09 17:13:20.127',	'2026-04-08 17:13:20.128',	'2026-04-08 17:13:20.128'),
(9,	1,	'4979ffdeb1f456b8737471a6e080a22828e3af9583eb07a5ac61b0302fac7538',	'2026-04-09 17:13:58.382',	'2026-04-08 17:13:58.383',	'2026-04-08 17:13:58.383'),
(10,	1,	'5a63642a0b2f861175cdc3be7abe65c84fb3b889d7fe7147e7989fd477bade55',	'2026-04-09 17:25:04.979',	'2026-04-08 17:25:04.979',	'2026-04-08 17:25:04.979'),
(11,	1,	'8b86d501513618dd5e40aa2f7b9a1a186cb1dff132c694db105a149231de9376',	'2026-04-09 17:39:41.398',	'2026-04-08 17:39:41.398',	'2026-04-08 17:39:41.398'),
(12,	1,	'7a13c40528b5172d7634c7ab3ddebdce4e6ee237aa833db31e157b6f89c215cd',	'2026-04-09 19:01:58.817',	'2026-04-08 19:01:58.822',	'2026-04-08 19:01:58.822'),
(18,	2,	'2126ac1b86e7f2df200fe1af4e7ebd0d63745f012279718df1e1924dc5de4916',	'2026-04-10 03:10:12.033',	'2026-04-09 03:10:12.033',	'2026-04-09 03:10:12.033');

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

INSERT INTO "tasks" ("id", "uuid", "title", "description", "assigned_user", "status", "created_by", "created_at", "updated_at") VALUES
(3,	'0483bb18-76bb-4205-b27b-b3b4a73d743c',	'test 2',	'Dignissimos suscipit',	6,	'IN_PROGRESS',	1,	'2026-04-08 19:06:52.057',	'2026-04-08 19:31:39.339'),
(5,	'81910538-6715-4063-8553-663ec20fd5ad',	'Autem voluptatem de',	'Modi est aspernatur',	5,	'DONE',	1,	'2026-04-08 19:46:24.164',	'2026-04-08 19:46:24.164'),
(2,	'450cfe23-0808-4b7a-84c4-189a3ffecdcd',	'task 1',	'Rem et consequatur ',	1,	'IN_PROGRESS',	NULL,	'2026-04-08 18:35:26.29',	'2026-04-09 02:44:15.932'),
(6,	'2afa120d-e006-4faa-88ce-54cbedda8427',	'Doloribus incididunt',	'Consequatur natus qu',	5,	'DONE',	1,	'2026-04-09 02:50:13.184',	'2026-04-09 02:50:13.184');

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

INSERT INTO "users" ("id", "uuid", "name", "email", "role", "password", "created_at", "updated_at") VALUES
(5,	'4f5b5e8f-ae0b-4e9b-9c24-6268ee0155a8',	'Fuga Fugiat sequi ',	'hyca@mailinator.com',	'user',	'$2b$10$Ir7fJVXuQSDnOtqSuMa6zu0SVQP4eAY4lxJeSaQClcGl2oSDXy3K2',	'2026-04-08 06:40:02.431',	'2026-04-08 06:40:02.431'),
(6,	'cc009c75-cef0-4135-a0a4-6559a4923915',	'Consequatur Soluta ',	'xuzosyzi@mailinator.com',	'user',	'$2b$10$ibcNmiAXqNpazySX8Gwrwu70W544esOJ0aZnJsRMri9eNg9W4D0hm',	'2026-04-08 18:25:00.131',	'2026-04-08 18:25:28.436'),
(2,	'958b57f7-d751-446d-9093-54ef14c1955b',	'admin',	'admin@gmail.com',	'admin',	'$2b$10$kNFcZRi6lGXNQgjRkcHQlOaiuUPQClVsPU0go7ihj/yf/FPRX65vW',	'2026-04-08 06:22:40.164',	'2026-04-09 03:09:10.292'),
(1,	'c859646b-b4b2-45cf-aab0-86c47e6183e7',	'User',	'user@gmail.com',	'user',	'$2b$10$wmYsCeuw5D8Nn6.3ny00feXCGXno1CzWUh/u3.osCPr6L2ScwHkIy',	'2026-04-07 19:32:38.381',	'2026-04-09 03:09:35.775');

ALTER TABLE ONLY "public"."activity_logs" ADD CONSTRAINT "activity_logs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

ALTER TABLE ONLY "public"."personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_assigned_user_fkey" FOREIGN KEY (assigned_user) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY "public"."tasks" ADD CONSTRAINT "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;

-- 2026-04-08 21:11:13 UTC
