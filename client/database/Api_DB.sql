-- Adminer 4.7.7 PostgreSQL dump




INSERT INTO "color" ("id", "type", "kitchenid") VALUES
(1,	'Beton',	1);






INSERT INTO "kitchen" ("id", "manufacturer", "model", "picture", "description") VALUES
(1,	'Dan Kuchen',	'LaCorte',	'11.jpg',	'kuhinjske fronte  bijele boje FliederWeiß (mediapan, lak, visoki sjaj),jednobojna radna ploča crne Coro boje (iveral, mat), zidna obloga drveni dekor Altfichte (iveral, melamin, mat)');















INSERT INTO "test1" ("id", "name", "lastname") VALUES
(1,	'abcd',	'fdfdfd');





DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying(50),
    "initials" character varying(25),
    "eyecolor" character varying(25),
    "age" integer,
    "guid" character varying(25),
    "email" character varying(50),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name", "initials", "eyecolor", "age", "guid", "email") VALUES
(200,	'Mateja Matejic',	'MM',	'BLUE',	25,	'aaaa',	'g@gmail.com'),
(183,	'Marko Maric',	'MM',	'blue',	82,	'a6f3177f-dfed-4129-86d0',	'markom@gmail.com'),
(199,	'Ruzica Ruzic',	'RR',	'blue',	35,	'abdaba',	'r.ruzic@gmail.com');

-- 2020-07-05 21:08:42.004071+00
