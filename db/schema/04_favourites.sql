DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER NOT NULL REFERENCES maps(id),
  favourited_by INTEGER NOT NULL REFERENCES users(id),
  UNIQUE (map_id, favourited_by)
);
