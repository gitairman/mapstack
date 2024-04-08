/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const pointQueries = require("../db/queries/points");

router.get("/", (req, res) => {
  console.log("hello");

  pointQueries
    .getAllPoints()
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("hello");

  pointQueries
    .getPointsByMapId(id)
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const data = req.body;
  pointQueries.addPoint(data).then((result) => console.log(result));
});

module.exports = router;
