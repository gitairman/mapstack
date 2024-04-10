const db = require("../connection");
const bcrypt = require("bcrypt");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
  return db
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error(err);
    });
};

const checkUsers = (username, password) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((data) => {
      if (data.rows.length === 0) {
        return null;
      }
      const { password: dbPassword } = data.rows[0];
      const passwordMatch = bcrypt.compareSync(password, dbPassword);
      if (passwordMatch) {
        return data.rows[0];
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const newUser = (username, hashedPassword) => {
  return db
    .query(
      `INSERT INTO users (username, password)
  VALUES ($1, $2) RETURNING id, username;`,
      [username, hashedPassword]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getUsers, checkUsers, newUser, getUserById };
