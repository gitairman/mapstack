/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const username = req.session?.username;
  if (!username) return res.render("mapsList");
  res.render("profile");
});
router.get("/:id", (req, res) => {
  console.log("rendering map by id");
  const map_id = req.params.id;
  const templateVars = { map_id };
  res.render("map", templateVars);
});

module.exports = router;
