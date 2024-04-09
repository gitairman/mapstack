const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

router.get('/', (req, res) => {
	return res.render('login');
});

//Use imported function to verify user in the database and redirect to profile.
router.post('/', (req, res) => {
	const { username, password } = req.body;

	userQueries.checkUsers(username, password)
		.then(user => {
			if (user) {
				req.session.username = username;
				return res.redirect('/profile');
			}
			return res.status(401).send('Please provide a username and password that match');
		})
		.catch(err => {
			console.error(err);
		});
});

module.exports = router;