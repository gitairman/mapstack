DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  coords POINT  NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  image_url VARCHAR(255) NOT NULL,
  map_id INTEGER NOT NULL REFERENCES maps(id),
  added_by INTEGER NOT NULL REFERENCES users(id)
);