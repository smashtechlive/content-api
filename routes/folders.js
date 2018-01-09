const express = require('express');
const router = express.Router();
const config = require('../lib/config');
const moment = require('moment');

// CREATE
router.post('/', function(req, res) {

	let folderValue = req.body.folder || 'global';
	let subfolders = req.body.subfolders.split(',') || [];
	let utcDateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
	let record = { 
		folder: folderValue, 
		subfolders: subfolders,
		utcDateTime: utcDateTime };

	config.db.collection('folders').insert(record, function(err, result) {
		if (err)
			console.log(err);		
		res.status(201).send('Folder Document Created');
	});

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