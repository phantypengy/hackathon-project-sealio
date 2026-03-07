DROP TABLE IF EXISTS videos CASCADE;

CREATE TABLE videos (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id),
    title           VARCHAR(50) NOT NULL,
    description     TEXT,
    video_url       VARCHAR(500) NOT NULL,
    thumbnail_url   VARCHAR(500) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);
