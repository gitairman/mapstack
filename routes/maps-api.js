/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const mapQueries = require("../db/queries/maps");

router.get("/", (req, res) => {
  mapQueries
    .getAllMaps()
    .then((maps) => {
      res.json({ maps });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  mapQueries
    .getMapById(id)
    .then((map) => {
      res.json({ map });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const { map_name } = req.body;

  mapQueries
    .addMap(map_name)
    .then((result) => {
      console.log("result in maps-api", result);

      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
