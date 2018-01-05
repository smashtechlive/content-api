const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
let AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
let S3_BUCKET = 'bgbucketfirst';

router.get('/', function(req, res) {
	res.send('IMAGES index route');
});

aws.config.update({
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_KEY,
	region: 'us-west-2'
});

let s3 = new aws.S3();
let upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'smashbucketrepo',
		key: function (req, file, callback) {
			callback(null, file.originalname);
		}
	})

});

router.post('/upload', upload.array('upl', 1), function (req, res, next) {
	res.send('image uploaded');
});

module.exports = router;