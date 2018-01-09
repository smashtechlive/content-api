const express = require('express');
const router = express.Router(); 
const config = require('../lib/config');
const moment = require('moment');

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
			console.log(err);		
		res.status(201).send('Video Document Created');
	});
	
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