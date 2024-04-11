const express = require("express");
const router = express.Router();
const mapQueries = require("../db/queries/maps");

router.get("/", (req, res) => {
  const username = req.session?.username;
  if (!username) return res.render("mapsList");
  res.render("profile", { username });
});
router.get("/:id", (req, res) => {
  console.log("rendering map by id");
  const username = req.session?.username;
  const map_id = req.params.id;
  const templateVars = { map_id, username };
  res.render("map", templateVars);
});

module.exports = router;
