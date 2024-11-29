-- Create "users" schema --
DROP SCHEMA IF EXISTS "users" CASCADE;
CREATE SCHEMA "users";

-- Create "users"."users" table --
DROP TABLE IF EXISTS "users"."users" CASCADE; 
CREATE TABLE "users"."users" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "names" VARCHAR(255) NOT NULL,
  "paternal_surname" VARCHAR(255) NULL,
	"maternal_surname" VARCHAR(255) NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NULL,
	"password_change_token" TEXT NULL,
  "password_change_token_expiration_date" TIMESTAMP NULL,
	"date_of_birth" DATE NULL,
  "photo_url" TEXT NULL,
	"cell_phone_number" VARCHAR(120) NOT NULL,
	"landline_phone_number" VARCHAR(120) NULL,
  "gender_type_id" BIGINT NOT NULL DEFAULT 3,
  "environment_id" BIGINT NOT NULL,
  "access_type_id" BIGINT NOT NULL,
  "type_id" BIGINT NOT NULL,
  "customer_type_id" BIGINT NULL,
  "branch_id" BIGINT NOT NULL,
	"status_id" BIGINT NOT NULL,
  "created_by" BIGINT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"last_modified_by" BIGINT NULL,
	"last_modified_at" TIMESTAMP NULL,
	"enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."session_tokens" table --
DROP TABLE IF EXISTS "users"."session_tokens" CASCADE; 
CREATE TABLE "users"."session_tokens" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "user_id" BIGINT NOT NULL,
  "refresh_token" TEXT NOT NULL,
  "refresh_token_expiration_date" TIMESTAMP NOT NULL,
  "ip_address" VARCHAR(45) NOT NULL,
  "device_info" TEXT NOT NULL,
  "city" VARCHAR(255) NULL,
  "region" VARCHAR(255) NULL,
  "country" VARCHAR(255) NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."login_history" table --
DROP TABLE IF EXISTS "users"."login_history" CASCADE; 
CREATE TABLE "users"."login_history" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "user_id" BIGINT NOT NULL,
  "ip_address" VARCHAR(45) NOT NULL,
  "device_info" TEXT NOT NULL,
  "city" VARCHAR(255) NULL,
  "region" VARCHAR(255) NULL,
  "country" VARCHAR(255) NULL,
  "action" VARCHAR(40) NOT NULL DEFAULT 'LOGIN',
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create "users"."drivers" table --
DROP TABLE IF EXISTS "users"."drivers" CASCADE; 
CREATE TABLE "users"."drivers" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "driver_id" BIGINT NOT NULL,
  "customer_id" BIGINT NOT NULL,
  "created_by" BIGINT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"last_modified_by" BIGINT NULL,
	"last_modified_at" TIMESTAMP NULL,
	"enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."modules" table --
DROP TABLE IF EXISTS "users"."modules" CASCADE; 
CREATE TABLE "users"."modules" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255),
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."roles" table --
DROP TABLE IF EXISTS "users"."roles" CASCADE;
CREATE TABLE "users"."roles" (
	"id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "abbreviation" VARCHAR(120) NULL,
  "description" VARCHAR(255),
  "image_url" VARCHAR(120) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."actions" table --
DROP TABLE IF EXISTS "users"."actions" CASCADE; 
CREATE TABLE "users"."actions" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255),
  "module_id" BIGINT NOT NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."roles_actions" transactional table --
DROP TABLE IF EXISTS "users"."roles_actions" CASCADE;
CREATE TABLE "users"."roles_actions" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "role_id" BIGINT NOT NULL,
  "action_id" BIGINT NOT NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."users_roles" transactional table --
DROP TABLE IF EXISTS "users"."users_roles" CASCADE;
CREATE TABLE "users"."users_roles" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "user_id" BIGINT NOT NULL,
  "role_id" BIGINT NOT NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."environments" table --
DROP TABLE IF EXISTS "users"."environments" CASCADE;
CREATE TABLE "users"."environments" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."access_types" table --
DROP TABLE IF EXISTS "users"."access_types" CASCADE;
CREATE TABLE "users"."access_types" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."types" table --
DROP TABLE IF EXISTS "users"."types" CASCADE;
CREATE TABLE "users"."types" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL,
  "description" VARCHAR(255) NULL,
  "created_by" BIGINT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"last_modified_by" BIGINT NULL,
	"last_modified_at" TIMESTAMP NULL,
	"enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."customer_types" table --
DROP TABLE IF EXISTS "users"."customer_types" CASCADE;
CREATE TABLE "users"."customer_types" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL,
  "description" VARCHAR(255) NULL,
  "created_by" BIGINT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"last_modified_by" BIGINT NULL,
	"last_modified_at" TIMESTAMP NULL,
	"enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."gender_types" table --
DROP TABLE IF EXISTS "users"."gender_types" CASCADE;
CREATE TABLE "users"."gender_types" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."statuses" table --
DROP TABLE IF EXISTS "users"."statuses" CASCADE;
CREATE TABLE "users"."statuses" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL UNIQUE,
  "description" VARCHAR(255) NULL,
  "hexadecimal_color" VARCHAR(60) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Create "users"."documentations" table --
DROP TABLE IF EXISTS "users"."documentations" CASCADE;
CREATE TABLE "users"."documentations" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "user_id" BIGINT NOT NULL,
  "ine_identification_number" VARCHAR(120) NULL,
  "ine_frontal_photo" VARCHAR(120) NULL,
  "ine_rear_photo" VARCHAR(120) NULL,
  "curp" VARCHAR(120) NULL UNIQUE,
	"rfc" VARCHAR(120) NULL UNIQUE,
  "driver_license_number" VARCHAR(120) NULL,
  "driver_license_expiration_date" DATE NULL,
  "driver_license_photo" VARCHAR(120) NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert info into "users"."users" table for foreign keys --
INSERT INTO "users"."users" ("names", "paternal_surname", "email", "password", "cell_phone_number", "gender_type_id", "environment_id", "access_type_id", "type_id", "branch_id", "status_id", "created_by") 
VALUES ('Soporte', 'Wundertec', 'info@wundertec.com', '$2a$10$FoqT9LOXpVwMw6Yz3Mgvqe3n0.OV4MMIl4aabeAIgiF7cuISbTCNa', '5614397613', 1, 1, 3, 1, 1, 2, 1);

-- Insert info into "users"."types" table for foreign keys --
INSERT INTO "users"."types" ("name", "description", "created_by")
VALUES 
  ('User', 'Usuario del sistema', 1),
  ('Customer', 'Cliente', 1);

-- Insert info into "users"."customer_types" table for foreign keys --
INSERT INTO "users"."customer_types" ("name", "description", "created_by")
VALUES 
  ('Natural person', 'Persona física', 1),
  ('Legal person', 'Persona moral', 1);

-- Insert info into "users"."gender_types" table for foreign keys --
INSERT INTO "users"."gender_types" ("name", "created_by")
VALUES 
  ('Masculino', 1),
  ('Femenino', 1),
  ('Sin especificar', 1);

-- Insert info into "users"."environments" table for foreign keys --
INSERT INTO "users"."environments" ("name", "created_by")
VALUES
  ('Backoffice', 1),
  ('App mobile', 1);

-- Insert info into "users"."access_types" table for foreign keys --
INSERT INTO "users"."access_types" ("name", "created_by")
VALUES
  ('Backoffice', 1),
  ('App mobile', 1),
  ('Both', 1);

-- Insert info into "users"."statuses" table for foreign keys --
INSERT INTO "users"."statuses" ("name", "created_by")
VALUES
  ('Cuenta sin crear', 1),
  ('Activo', 1),
  ('Ausente', 1),
  ('Desconectado', 1);

-- Insert info into "users"."modules" table for foreign keys --
INSERT INTO "users"."modules" ("name", "description", "created_by")
VALUES
  ('Users', 'Usuarios', 1),
  ('Vehicles', 'Vehículos', 1),
  ('Reports', 'Reportes', 1);

-- Insert info into "users"."roles" table for foreign keys --
INSERT INTO "users"."roles" ("name", "created_by")
VALUES 
  ('Super Administrador', 1),
  ('Administrador', 1);

-- Insert info into "users"."actions" table for foreign keys --
INSERT INTO "users"."actions" ("name", "description", "module_id", "created_by")
VALUES 
  ('view_all_users', 'Ver todos los usuarios', 1, 1),
  ('view_user_details', 'Ver detalles de usuario', 1, 1),
  ('create_user', 'Crear usuario', 1, 1),
  ('edit_user', 'Editar usuario', 1, 1),
  ('delete_user', 'Eliminar usuario', 1, 1);

-- Insert info into "users"."roles_actions" table for foreign keys --
INSERT INTO "users"."roles_actions" ("role_id", "action_id", "created_by")
VALUES
  (1, 1, 1),
  (1, 2, 1),
  (1, 3, 1),
  (1, 4, 1),
  (1, 5, 1);

-- Insert info into "users"."users_roles" table for foreign keys --
INSERT INTO "users"."users_roles" ("user_id", "role_id", "created_by")
VALUES
  (1, 1, 1);










-- Create "common" schema --
DROP SCHEMA IF EXISTS "common" CASCADE;
CREATE SCHEMA "common";

-- Create "common"."branches" table --
DROP TABLE IF EXISTS "common"."branches" CASCADE;
CREATE TABLE "common"."branches" (
  "id" BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
  "name" VARCHAR(255) NOT NULL,
  "created_by" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_by" BIGINT NULL,
  "last_modified_at" TIMESTAMP NULL,
  "enable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert info into "common"."branches" table for foreign keys --
INSERT INTO "common"."branches" ("name", "created_by")
VALUES
  ('Centenario', 1);










-- Add foreign key constraints to the "users"."users" table --
ALTER TABLE "users"."users" ADD CONSTRAINT gender_type_id_fk FOREIGN KEY ("gender_type_id") REFERENCES "users"."gender_types"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT environment_id_fk FOREIGN KEY ("environment_id") REFERENCES "users"."environments"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT access_type_id_fk FOREIGN KEY ("access_type_id") REFERENCES "users"."access_types"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT type_id_fk FOREIGN KEY ("type_id") REFERENCES "users"."types"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT customer_type_id_fk FOREIGN KEY ("customer_type_id") REFERENCES "users"."customer_types"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT branch_id_fk FOREIGN KEY ("branch_id") REFERENCES "common"."branches"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT status_id_fk FOREIGN KEY ("status_id") REFERENCES "users"."statuses"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."session_tokens" table --
ALTER TABLE "users"."session_tokens" ADD CONSTRAINT user_id_fk FOREIGN KEY ("user_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."login_history" table --
ALTER TABLE "users"."login_history" ADD CONSTRAINT user_id_fk FOREIGN KEY ("user_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."drivers" table --
ALTER TABLE "users"."drivers" ADD CONSTRAINT driver_id_fk FOREIGN KEY ("driver_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."drivers" ADD CONSTRAINT customer_id_fk FOREIGN KEY ("customer_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."drivers" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."drivers" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."modules" table --
ALTER TABLE "users"."modules" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."modules" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."roles" table --
ALTER TABLE "users"."roles" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."roles" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."actions" table --
ALTER TABLE "users"."actions" ADD CONSTRAINT module_id_fk FOREIGN KEY ("module_id") REFERENCES "users"."modules"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."actions" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."actions" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."roles_actions" transactional table --
ALTER TABLE "users"."roles_actions" ADD CONSTRAINT role_id_fk FOREIGN KEY ("role_id") REFERENCES "users"."roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."roles_actions" ADD CONSTRAINT action_id_fk FOREIGN KEY ("action_id") REFERENCES "users"."actions"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."roles_actions" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."roles_actions" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."users_roles" transactional table --
ALTER TABLE "users"."users_roles" ADD CONSTRAINT user_id_fk FOREIGN KEY ("user_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users_roles" ADD CONSTRAINT role_id_fk FOREIGN KEY ("role_id") REFERENCES "users"."roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users_roles" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."users_roles" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."environments" table --
ALTER TABLE "users"."environments" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."environments" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."access_types" table --
ALTER TABLE "users"."access_types" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."access_types" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."gender_types" table --
ALTER TABLE "users"."gender_types" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."gender_types" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."statuses" table --
ALTER TABLE "users"."statuses" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."statuses" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "users"."documentations" table --
ALTER TABLE "users"."documentations" ADD CONSTRAINT user_id_fk FOREIGN KEY ("user_id") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."documentations" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "users"."documentations" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add foreign key constraints to the "common"."branches" table --
ALTER TABLE "common"."branches" ADD CONSTRAINT created_by_fk FOREIGN KEY ("created_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "common"."branches" ADD CONSTRAINT last_modified_by_fk FOREIGN KEY ("last_modified_by") REFERENCES "users"."users"(id) ON UPDATE CASCADE ON DELETE CASCADE;