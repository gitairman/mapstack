const db = require("../connection");

const getAllPoints = () => {
  return db.query("SELECT * FROM points;").then((data) => {
    return data.rows;
  });
};

const getPointsByMapId = (id) => {
  return db
    .query("SELECT * FROM points WHERE map_id = $1;", [id])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => err);
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

  return db
    .query(
      "INSERT INTO points (coords, title, description, image_url, map_id, added_by) VALUES ($1, $2, $3, $4, $5, $6);",
      pData
    )
    .then(() => "point sent to database")
    .catch((err) => err);
};

const updatePointById = (id, { title, image_url, description, coords }) => {
  const pData = [];
  let queryString = "UPDATE points SET ";
  if (title) {
    pData.push(title);
    queryString += `title=$${pData.length}, `;
  }
  if (description) {
    pData.push(description);
    queryString += `description=$${pData.length}, `;
  }
  if (coords) {
    pData.push(`(${Number(coords[0])}, ${Number(coords[1])})`);
    queryString += `coords=$${pData.length} `;
  }
  if (image_url) {
    pData.push(image_url);
    queryString += `image_url=$${pData.length} `;
  }
  pData.push(id);
  queryString += `WHERE id=$${pData.length};`;

  return db
    .query(queryString, pData)
    .then(() => "point updated in database")
    .catch((err) => err);
};

const deletePointbyId = (id) => {
  return db
    .query("DELETE FROM points WHERE id=$1;", [id])
    .then(() => "point deleted from database")
    .catch((err) => err);
};

module.exports = {
  getAllPoints,
  getPointsByMapId,
  addPoint,
  deletePointbyId,
  updatePointById,
};
