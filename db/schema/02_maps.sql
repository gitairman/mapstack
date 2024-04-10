DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
<<<<<<< HEAD
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    user_id INTEGER
)
=======
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_by INTEGER NOT NULL REFERENCES users(id)
);
>>>>>>> 3f2ebf181a8bea14783303269b1915a3c3189236
