DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(20) UNIQUE NOT NULL,
    password_hash   VARCHAR(20) UNIQUE NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);