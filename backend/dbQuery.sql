create database todoapp;

create table users(
id serial primary key, 
username varchar(50) unique not null,
email varchar(255) unique not null,
password_hash text not null,
);

create table todos(
    id serial primary key,
    user_id integer not null references users(id) on delete cascade,
    title varchar(255) not null,
    completed boolean default false,
    created_at timestamp default current_timestamp
)
