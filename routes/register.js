const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	return res.render('register');
});

router.post('/', (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	userQueries.newUser(username, hashedPassword)
		.then(() => {
			console.log('money')
			return res.redirect('/profile')
		})
		.catch((err) => {
			console.error(err);
		});
});

module.exports = router;