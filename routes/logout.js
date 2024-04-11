const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.post("/", (req, res) => {
  req.session = null;
  return res.redirect("/");
});
=======
router.post('/', (req, res) => {
	req.session.user_id = null;
	return res.redirect('/')
})
>>>>>>> 1d034a64b3aa932a5111d6bde3dbd82a63600ca4

module.exports = router;
