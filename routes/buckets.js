const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

// load AWS credentials
let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
let AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
let S3_BUCKET = 'smashbucketrepo';

aws.config.update({
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_KEY,
	region: 'us-west-2'
});

router.get('/', function(req, res) {
	
	let s3 = new aws.S3();

	// list buckets
	s3.listBuckets(function (err, data) {
		if (err) { console.log(err); }
		else {
			res.json({
				buckets: data.Buckets
			})
		}
	});

});

router.get('/content', function(req, res) {
  // use query param to get bucket name or default
	var s3_bucket = req.query.bucketName || S3_BUCKET;
	var params = {Bucket: s3_bucket, MaxKeys: 2}

	let s3 = new aws.S3();
	s3.listObjects(params, function(err, data) {
		if (err) { console.log(err) }
		else {
			res.json({
				bucketInfo: data
			})
		}
	})
		
});

module.exports = router;