const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	console.log("I work")
	return res.render('register')
})

module.exports = router;