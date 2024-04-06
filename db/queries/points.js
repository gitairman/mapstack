const db = require("../connection");

const getAllPoints = () => {
  console.log("hello from getPoints function");

  return db.query("SELECT * FROM points;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};

const getPointsByMapId = (id) => {
  return db
    .query("SELECT * FROM points WHERE map_id = $1;", [id])
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllPoints, getPointsByMapId };
