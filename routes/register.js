const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	return res.render('register')
})

router.post('/', (req, res) => {
	console.log('hi')
})

module.exports = router;