const express = require('express');
const router = express.Router(); 
const config = require('../lib/config');
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;

// CREATE
router.post('/', function(req, res) {

	let videoFolder = req.body.folder || 'global-video';
	let videoName = req.body.video || '';
	let utcDateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
	let record = {
		folder: videoFolder,
		video: videoName,
		utcDateTime: utcDateTime
	}

	config.db.collection('videos').insert(record, function(err, result) {
		if (err)
			var errorMsg = {msg: 'Problem Creating Video Document', error: err };
			res.status(500).send(errorMsg);		
		res.status(201).send('Video Document Created');
	});
	
});

// READ
router.get('/', function(req, res) {

	let recordLimit = req.query.limit || 50; 

	config.db.collection('videos').find({}).limit(recordLimit).toArray(function (err, videos) {
		if (err) {
			var errorMsg = {msg: 'Problem Retrieving Video Documents', error: err };
			res.status(500).send(errorMsg);
		}
		let payload = {data: videos};
		res.send(payload)
	});

});

// UPDATE
router.put('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {'_id': new ObjectID(recordId)};
	let newFolder = req.body.folder || 'global-video';
	let newVideo = req.body.video;
	let newValues = { $set: {folder: newFolder, video: newVideo }};
	
	config.db.collection('videos').updateOne(query, newValues, function(err, result) {
		if (err) { 
			var errorMsg = {msg: 'Problem Updating Video Document', error: err };
			res.status(500).send(errorMsg); 
		}
		res.status(202).send('Video Record Updated');
	});	

});

// DELETE
router.delete('/:id', function(req, res) {
	let recordId = req.params.id;
	let query = {"_id": new ObjectID(recordId)};

	config.db.collection('videos').remove(query, function (err, result) {
		if (err) {
			var errorMsg = {msg: 'Problem Deleting Video Document', error: err };
			res.status(500).send(errorMsg);
		}
		res.send('Video Deleted');
	});
	
});

module.exports = router;