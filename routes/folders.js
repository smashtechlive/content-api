const express = require('express');
const router = express.Router();
const config = require('../lib/config');

// CREATE
router.post('/', function(req, res) {
	res.send('FOLDERS create route');
});

// READ
router.get('/', function(req, res) {

	let recordLimit = req.query.limit || 50; 

	config.db.collection('folders').find({}).limit(recordLimit).toArray(function (err, folders) {
		let payload = {data: folders};
		res.send(payload)
	});

});

// UPDATE
// DELETE


module.exports = router;