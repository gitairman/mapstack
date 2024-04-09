const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
	req.session.username= null;
	return res.redirect('/')
})

module.exports = router;