DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL CHECK (first_name != ''),
    last_name VARCHAR(255) NOT NULL CHECK (last_name != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    pwd_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_code (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    email VARCHAR(255) NOT NULL --UNIQUE necessary?
);