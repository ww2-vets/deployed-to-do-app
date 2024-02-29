
-- CREATE DATABASE --------------------------
CREATE DATABASE IF NOT EXISTS todoapp;

-- CREATE TABLES --------------------------
 
CREATE TABLE IF NOT EXISTS todoapp.public.todos (
    id uuid NOT NULL
    user_email character varying(255),
    title character varying(30),
    progress integer,
    date character varying(300),
);

CREATE TABLE IF NOT EXISTS todoapp.public.todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS todoapp.public.users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

INSERT INTO todoapp.public.todos(id, user_email, title, progress, date) VALUES(0, jack@email.com, First todo, 10, $1);

-- GET USER SPECIFIC TODOS
SELECT * FROM todos WHERE user_email = $1

-- CREATE NEW TODO ---------------------------
INSERT INTO todoapp.public.todos(id, user_email, title, progress, date) VALUES(0, jack@email.com, First todo, 10, $1);

