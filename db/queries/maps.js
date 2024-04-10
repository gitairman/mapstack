const db = require('../connection');

const fetchAllMaps = () => {
  return db.query(`SELECT * FROM maps`)
    .then(data => {
      return data.rows;
    })
}

const newMap = (title, description, users_id) => {
  return db.query(`INSERT INTO maps (title, description, users_id) 
  VALUES ($1, $2, $3)`,
    [title, description, users_id]
  )
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { newMap, fetchAllMaps }
