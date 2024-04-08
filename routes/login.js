const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

//temporary users object

const users = {
	user1: {
		username: 'a',
		password: 'a'
	},
};

router.get('/', (req, res) => {
	return res.render('login');
});

router.post('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = { username: username, password: password }

	if (password === user.password) {
		return res.redirect('/profile');
	}
});

module.exports = router;