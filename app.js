const express = require('express');
const app = express();
const config = require('./lib/config');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3022;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");//add urls here instead of being global with CORS 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('json_spaces', 2);

app.use(bodyParser.json());

// Load Routes
let folders = require('./routes/folders');
let images = require('./routes/images');
let videos = require('./routes/videos');

//for health checks 
app.get('/ping', function (req, res) {	
	res.end('1');
});

// Register Routes
app.use('/folders', folders);
app.use('/images', images);
app.use('/videos', videos);

// Bind API to PORT
app.listen(port, function () {
  console.log('Log API running on port : ' + port);
})