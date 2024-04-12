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
  pointQueries
    .getAllPoints()
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  pointQueries
    .getPointsByMapId(id)
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/", (req, res) => {
  const data = req.body;
  data.added_by = req.session.user_id;
  pointQueries
    .addPoint(data)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  pointQueries
    .updatePointById(id, req.body)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  pointQueries
    .deletePointbyId(id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
