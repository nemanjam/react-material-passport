const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

// FACEBOOK AUTH
router.get('/auth/facebook', passport.authenticate('facebook', { session: false }));

tokenFromUser = (user) => {
	const token = jwt.sign({}, keys.secretOrKey, {
		expiresIn: '12h',
		subject: user.id
	  });
	return token;
}

router.get(keys.facebookCallbackURL, passport.authenticate('facebook', { scope: ['public_profile', 'email'], failureRedirect: '/', session: false }),
	(req, res) => {
		const token = tokenFromUser(req.user);
		res.cookie('x-auth-cookie', token);
		// console.log(token);
		res.redirect(keys.facebookRedirectURL);
	}
);


// LOGOUT
router.get('/api/logout', (req, res) => {
	req.logout();
	res.send(false);
});

module.exports = router;
