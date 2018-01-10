const express = require('express');
const router = express.Router();
const config = require('../lib/config');
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;

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
			var errorMsg = {msg: 'Problem Folder Document', error: err };
			// log.publish(errorMsg);
		  res.status(500).send(errorMsg);
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
router.put('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};
	let newFolder = req.body.folder || 'global';
	let newValues = {$set: {folder: newFolder}};
	

	config.db.collection('folders').updateOne(query, newValues, function(err, result) {
		if (err) { console.log(err); }
		res.send('Folder Record Updated');
	});	

});

// DELETE
router.delete('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};

	config.db.collection('folders').remove(query, function (err, result) {
		if (err)
			console.log(err);
		res.send('Folder Deleted');
	});
	
});


module.exports = router;