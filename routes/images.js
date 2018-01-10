const express = require('express');
const router = express.Router();
const config = require('../lib/config');
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;

// CREATE
router.post('/', function(req, res) {
	
	let folderValue = req.body.folder || 'global-images-raw';	
	let utcDateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
	let record = {
		folder: folderValue,
		utcDateTime: utcDateTime
	};

	// Include image prop if sent in request
	if (req.body.image) {
		record.image = req.body.image;
	}

	config.db.collection('images').insert(record, function(err, result) {
		if (err) {
			var errorMsg = {msg: 'Problem Creating Image Document', error: err };
			// log.publish(errorMsg);
		  res.status(500).send(errorMsg);
		}			
		res.status(201).send('Image Document Created');
	});

});

// READ
router.get('/', function(req, res) {
	let recordLimit = req.query.limit || 50;

	config.db.collection('images').find({}).limit(recordLimit).toArray(function (err, images) {
		if (err) {
			var errorMsg = {msg: 'Problem Retrieving Image Documents', error: err };
			// log.publish(errorMsg);
		  res.status(500).send(errorMsg);
		}			
		let payload = {data: images};
		res.status(200).send(payload);
	});
});

// UPDATE
router.put('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};
	let newValues = { $set: {}}

	// folder property
	if (req.body.folder) {
		newValues.$set.folder = req.body.folder;
	}

	// images property
	if (req.body.image) {
		newValues.$set.image = req.body.image;
	}

	config.db.collection('images').updateOne(query, newValues, function(err, result) {
		if (err) {			
			var errorMsg = {msg: 'Problem Updating Image Document', error: err };
			res.status(500).send(errorMsg);
		}
		res.send('Image Record Updated')
	});
	

});

// DELETE
router.delete('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {"_id": new ObjectID(recordId)};

	config.db.collection('images').remove(query, function (err, result) {
		if (err) {			
			var errorMsg = {msg: 'Problem Deleting Image Document', error: err };
			// log.publish(errorMsg);
			res.status(500).send(errorMsg);
		}
		res.send('Image Deleted');
	});
});

module.exports = router;