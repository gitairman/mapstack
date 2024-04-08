const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const checkUsers = (username, password) => {
  return db.query('SELECT username, password FROM users WHERE username = $1', [username])
    .then(data => {
      const { username, password } = data.rows[0];
      console.log(username, password)
    });
};

module.exports = { getUsers };
