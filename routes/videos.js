const express = require('express');
const router = express.Router(); 
const config = require('../lib/config');

// CREATE
router.post('/', function(req, res) {
	res.send('Videos create route');
});

// READ
router.get('/', function(req, res) {

	let recordLimit = req.query.limit || 50; 

	config.db.collection('videos').find({}).limit(recordLimit).toArray(function (err, videos) {
		let payload = {data: videos};
		res.send(payload)
	});

});

// UPDATE
// DELETE

module.exports = router;