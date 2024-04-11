const express = require("express");
const userQueries = require("../db/queries/users");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("login");
});

//Use imported function to verify user in the database and redirect to profile.
router.post("/", (req, res) => {
  const { username, password } = req.body;

<<<<<<< HEAD
  userQueries
    .checkUsers(username, password)
    .then((data) => {
      console.log(data);

      if (data) {
        req.session.user_id = data.id;
        req.session.username = data.username;
        return res.redirect("/maps");
      }
      return res
        .status(401)
        .send("Please provide a username and password that match");
    })
    .catch((err) => {
      console.error(err);
    });
=======
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
>>>>>>> 1d034a64b3aa932a5111d6bde3dbd82a63600ca4
});

module.exports = router;
