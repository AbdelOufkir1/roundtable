-- DROP DATABASE IF EXISTS roundtable;
-- CREATE DATABASE roundtable;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS supporters CASCADE;
DROP TABLE IF EXISTS debaters CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS debate CASCADE;
DROP TABLE IF EXISTS followers CASCADE;
DROP TABLE IF EXISTS discussions CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR NULL,
    name VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    image VARCHAR NULL,
    bio VARCHAR NULL,
    numSupporters INT NULL,
    numDebaters INT NULL,
    supporting INT REFERENCES users(id) Null,
    -- following INT REFERENCES debate(id) Null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    numFollowers INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supporters (
    user_id INT REFERENCES users(id) NOT NULL,
    id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE debaters (
    user_id INT REFERENCES users(id) NOT NULL,
    id INT REFERENCES users(id) NOT NULL
);


CREATE TABlE posts (
    id SERIAL PRIMARY KEY,
    debate_id INT REFERENCES debate(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    text VARCHAR NUll,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers (
    debate_id INT REFERENCES debate(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    debate_id INT REFERENCES debate(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    title VARCHAR NULL,
    body VARCHAR NULL
);

CREATE TABLE debateFollower (
    id SERIAL PRIMARY KEY,
    debate_id INT REFERENCES debate(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);