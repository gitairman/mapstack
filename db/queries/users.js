<<<<<<< HEAD
const db = require('../connection');
const bcrypt = require('bcrypt');
=======
const db = require("../connection");
const bcrypt = require("bcrypt");
>>>>>>> feature/combinemaps

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserById = (id) => {
<<<<<<< HEAD
  return db.query("SELECT * FROM users WHERE id = $1", [id]).then((data) => {
    return data.rows[0];
  })
    .catch(err => {
=======
  return db
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
>>>>>>> feature/combinemaps
      console.error(err);
    });
};

const checkUsers = (username, password) => {
<<<<<<< HEAD
  return db.query('SELECT username, password FROM users WHERE username = $1', [username])
    .then(data => {
      if (data.rows.length === 0) {
        return false;
      }
      const { password: dbPassword } = data.rows[0];
      if (dbPassword === password) {
        return true;
      }
    })
    .catch(err => {
=======
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
>>>>>>> feature/combinemaps
      console.error(err);
    });
};

const newUser = (username, hashedPassword) => {
<<<<<<< HEAD
  return db.query(`INSERT INTO users (username, password) 
  VALUES ($1, $2)`,
    [username, hashedPassword]
  )
    .then(() => {
      return true;
=======
  return db
    .query(
      `INSERT INTO users (username, password)
  VALUES ($1, $2) RETURNING id, username;`,
      [username, hashedPassword]
    )
    .then((data) => {
      return data.rows[0];
>>>>>>> feature/combinemaps
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getUsers, checkUsers, newUser, getUserById };
