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

const addPoint = ({
  coords,
  title,
  description,
  image_url,
  map_id,
  added_by,
}) => {
  const pData = [
    `(${Number(coords[0])}, ${Number(coords[1])})`,
    title,
    description,
    image_url,
    Number(map_id),
    Number(added_by),
  ];
  console.log(pData);

  return db
    .query(
      "INSERT INTO points (coords, title, description, image_url, map_id, added_by) VALUES ($1, $2, $3, $4, $5, $6);",
      [...pData]
    )
    .then(() => {
      return "point sent to database";
    });
};

const deletePointbyId = (id) => {
  return db.query("DELETE FROM points WHERE id=$1;", [id]).then(() => {
    return "point sent to database";
  });
};

module.exports = { getAllPoints, getPointsByMapId, addPoint, deletePointbyId };
