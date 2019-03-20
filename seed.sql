DROP DATABASE IF EXISTS roundtable;
CREATE DATABASE roundtable;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    image VARCHAR NULL,
    password VARCHAR NULL,
    bio VARCHAR NULL,
    numSupporters INT NULL,
    numDebaters INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supporters (
    user_id INT REFERENCES users(id) NOT NULL,
    id INT REFERENCES users(id) NOT NULL,   
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE debaters (
    user_id INT REFERENCES users(id) NOT NULL,
    id INT REFERENCES users(id) NOT NULL,
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABlE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    title VARCHAR NUll,
    body VARCHAR NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    type VARCHAR UNIQUE NOT NULL
);

CREATE TABLE debate (
    id SERIAL PRIMARY KEY,
    first_debater INT REFERENCES users(id) NOT NULL,
    second_debater INT REFERENCES users(id) NOT NULL,
    title VARCHAR NOT NULl,
    description VARCHAR NOT NULL,
    category INT REFERENCES category(id) NOT NULL,
    rules VARCHAR NOT NULL,
    followers INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    debate_id INT REFERENCES debate(id) NOT NULL,
    title VARCHAR NULL,
    body VARCHAR NULL
);