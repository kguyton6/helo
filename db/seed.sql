
-- create table user_attributes (
-- user_id serial primary key,
-- gender text,
-- hair_color text,
-- eye_color text,
-- hobby text,
-- birthday integer,
-- birth_month INTEGER,
-- birth_year integer,
-- FOREIGN KEY (user_id) references helo_users(user_id)
-- )

create table helo_users(
user_id serial primary key,
 auth_id text not null, 
 first_name text, 
 last_name text, 
  gender text,
  picture text,
haircolor text,
eyecolor text,
hobby text,
birthday integer,
birthmonth integer,
birthyear integer,
unique (auth_id, user_id))

create table helo_friends (
friend_id integer references helo_users(user_id),
user_id integer references helo_users(user_id))


--   unique (auth_id))


-- create table user_attributes (
-- user_id serial,
-- auth_id text references helo_users(auth_id),
--     first_name text,
-- last_name text,
-- gender text,
-- hair_color text,
-- eye_color text,
-- hobby text,
-- birthday integer,
-- birth_month INTEGER,
-- birth_year integer,
-- primary key (user_id, auth_id)
-- )
    -- alter table user_attributes

-- drop table auth
-- create table helo_friends(friends_id serial primary key, user_id integer references helo_users(user_id), first_name text, last_name text )

-- CREATE TABLE helo_users (
--  user_id serial primary key,
--   auth_id TEXT NOT NULL,
--   name text,
--   picture text,
--   email text,


-- select * from helo_users
-- drop table helo_users
-- drop table helo_friends