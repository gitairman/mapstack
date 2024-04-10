const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  return res.render("register");
});

router.post("/", (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  userQueries
    .newUser(username, hashedPassword)
    .then((data) => {
      console.log(data);

      req.session.username = data.username;
      req.session.user_id = data.id;
      return res.redirect("/maps");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
