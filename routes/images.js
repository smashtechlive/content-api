const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.send('IMAGES index route');
});

module.exports = router;