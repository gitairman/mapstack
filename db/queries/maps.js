const db = require("../connection");

const getAllMaps = () => {
  console.log("hello from getPoints function");

  return db.query("SELECT * FROM maps;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};

const getMapById = (id) => {
  return db
    .query("SELECT * FROM maps WHERE map_id = $1;", [id])
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllMaps, getMapById };
