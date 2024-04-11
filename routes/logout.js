const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.session = null;
  return res.redirect("/");
});

module.exports = router;
