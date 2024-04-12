const db = require("../connection");

const getAllMaps = () => {
  // console.log("inside getAllMaps function");

  return db.query("SELECT * FROM maps;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};

const getMapById = (id) => {
  return db.query("SELECT * FROM maps WHERE id = $1;", [id]).then((data) => {
    console.log(data.rows);
    return data.rows[0];
  });
};

const addMap = (map_name, map_desc, created_by) => {
  console.log(map_name);

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

const getFavourites = (id) => {
  return db
    .query(
      "SELECT maps.id, maps.name FROM maps JOIN favourites ON favourites.map_id=maps.id WHERE favourited_by=$1;",
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};
const getContributedTo = (id) => {
  return db
    .query(
      "SELECT DISTINCT maps.id, maps.name FROM maps JOIN points ON points.map_id=maps.id WHERE added_by=$1;",
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};
const getCreated = (id) => {
  return db
    .query("SELECT maps.id, maps.name FROM maps WHERE created_by=$1;", [id])
    .then((data) => {
      return data.rows;
    });
};

const favouriteMap = (map_id, user_id) => {
  return db
    .query("INSERT INTO favourites (map_id, favourited_by) VALUES ($1, $2);", [
      map_id,
      user_id,
    ])
    .then(() => {
      return `favourited map ${map_id} by user ${user_id}`;
    })
    .catch((err) => console.log(err));
};

const unFavouriteMap = (map_id, user_id) => {
  return db
    .query("DELETE FROM favourites WHERE map_id = $1 AND favourited_by = $2;", [
      map_id,
      user_id,
    ])
    .then(() => {
      return `unfavourited map ${map_id} by user ${user_id}`;
    })
    .catch((err) => console.log(err));
};

const checkIfFavourite = (map_id, user_id) => {
  // console.log(map_id, user_id);

  return db
    .query(
      "SELECT * FROM favourites WHERE map_id = $1 AND favourited_by = $2;",
      [map_id, user_id]
    )
    .then((data) => {
      // console.log(data);

      return data.rows[0];
    })
    .catch((err) => console.log(err));
};

const deleteMap = (id) => {
  return db
    .query("DELETE FROM maps WHERE id=$1;", [Number(id)])
    .then(() => "map deleted from database")
    .catch((err) => err);
};

module.exports = {
  getAllMaps,
  getMapById,
  addMap,
  getContributedTo,
  getFavourites,
  getCreated,
  favouriteMap,
  unFavouriteMap,
  checkIfFavourite,
  deleteMap,
};
