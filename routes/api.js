const express = require('express');
const router = express.Router();

const requireJwtAuth = require('../middleware/requireJwtAuth');

router.get('/api/user', requireJwtAuth, (req, res) => {
	res.send({user: req.user})
});

module.exports = router;
