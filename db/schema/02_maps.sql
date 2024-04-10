DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    user_id INTEGER
)