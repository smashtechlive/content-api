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
		if (err)  {
			var errorMsg = {msg: 'Problem Creating Folder Document', error: err };
			// log.publish(errorMsg);
		  res.status(500).send(errorMsg);
		}			
		res.status(201).send('Folder Document Created');
	});

});

// READ
router.get('/', function(req, res) {

	let recordLimit = req.query.limit || 50; 

	config.db.collection('folders').find({}).limit(recordLimit).toArray(function (err, folders) {
		if (err) {
			var errorMsg = {msg: 'Problem Retrieving Folder Documents', error: err };
			res.status(500).send(errorMsg);
		}
		let payload = {data: folders};
		res.send(payload)
	});

});

// UPDATE
router.put('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};
	let newValues = { $set: {}};

	// folder property
	if (req.body.folder) {
		newValues.$set.folder = req.body.folder;
	}

	config.db.collection('folders').updateOne(query, newValues, function(err, result) {
		if (err) { 
			var errorMsg = {msg: 'Problem Updating Folder Document', error: err };
			res.status(500).send(errorMsg); 
		}
		res.send('Folder Record Updated');
	});	

});

// DELETE
router.delete('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};

	config.db.collection('folders').remove(query, function (err, result) {
		if (err) {			
			var errorMsg = {msg: 'Problem Deleting Folder Documents', error: err };
			res.status(500).send(errorMsg);
		}
		res.send('Folder Deleted');
	});
	
});


module.exports = router;