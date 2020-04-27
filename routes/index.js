const router = require('express').Router();
const addRouter = require('./contacts');
const path = require('path');

// API routes
router.use('/contacts', addRouter);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;