<<<<<<< HEAD
const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
	req.session.user_id = null;
	return res.redirect('/')
})

module.exports = router;
=======
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.session = null;
  return res.redirect("/");
});

module.exports = router;
>>>>>>> feature/combinemaps
