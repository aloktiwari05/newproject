create database todoapp;

create table users(
id serial primary key, 
username varchar(50) unique not null,
email varchar(255) unique not null,
password_hash text not null,
);

create table task(
task_id serial primary key,
title varchar(255) not null,
description text not null,
completed boolean default false,
user_id integer not null references users(id),
created_at timestamp default current_timestamp
)

-- CREATE TABLE todos (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     status VARCHAR(20) NOT NULL DEFAULT 'pending'
--         CHECK (status IN ('pending', 'in_progress', 'completed')),
--     priority VARCHAR(10) NOT NULL DEFAULT 'medium'
--         CHECK (priority IN ('low', 'medium', 'high')),
--     due_date TIMESTAMP,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
