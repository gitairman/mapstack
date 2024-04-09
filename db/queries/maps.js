const db = require("../connection");

const getAllMaps = () => {
  // console.log("inside getAllMaps function");

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

const addMap = (map_name) => {
  console.log(map_name);
  const map_desc = "testing";
  const created_by = 1;

  return db
    .query(
      "INSERT INTO maps (name, description, created_by) VALUES ($1, $2, $3) RETURNING *;",
      [map_name, map_desc, created_by]
    )
    .then((data) => {
      // console.log(data.rows);

      return data.rows[0];
    });
};

module.exports = { getAllMaps, getMapById, addMap };
