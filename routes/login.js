const express = require('express');
const userQueries = require('../db/queries/users');
const router = express.Router();

router.get('/', (req, res) => {
	return res.render('login');
});

//Use imported function to verify user in the database and redirect to profile.
router.post('/', (req, res) => {
	const { username, password } = req.body;

	userQueries
	.checkUsers(username, password)
		.then(user => {
			if (user) {
				req.session.user_id = user.id;
				return res.redirect('/profile');
			}
			res.render('login', { error: 'An error occurred. Please try again later.' });
		})
		.catch(err => {
			console.error(err);
			res.render('login', { error: 'An error occurred. Please try again later.' });
		});
});

module.exports = router;