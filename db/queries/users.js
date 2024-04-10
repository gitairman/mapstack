<<<<<<< HEAD
const db = require('../connection');
const bcrypt = require('bcrypt');
=======
const db = require("../connection");
>>>>>>> 3f2ebf181a8bea14783303269b1915a3c3189236

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const checkUsers = (username, password) => {
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
      console.error(err);
    });
};

const newUser = (username, hashedPassword) => {
  return db.query(`INSERT INTO users (username, password) 
  VALUES ($1, $2)`,
    [username, hashedPassword]
  )
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getUsers, checkUsers, newUser };
