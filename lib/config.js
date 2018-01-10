const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
let rmqUrl = null, rmqUser = null, rmqPass = null;

if(process.env.commonSetup == "localhost"){
	process.env.NODE_ENV = 'development';
	process.env.rmq = 'stage';
	process.env.db = 'stage';
}
else if(process.env.commonSetup == "stage"){
	process.env.NODE_ENV = 'development';
	process.env.rmq = 'stage';
	process.env.db = 'stage';
}
else if(process.env.commonSetup == "production"){
	process.env.NODE_ENV = 'production';
	process.env.rmq = 'production';
	process.env.db = 'production';
}

if(process.env.rmq == 'stage'){
	rmqUrl = "stage-log-rmq.skinnyfit.com";
	rmqUser = "smashtech";
	rmqPass = "rabbit13242017";
	exports.rmqConnectionString = 'amqp://'+rmqUser+':'+rmqPass+'@'+ rmqUrl;
}
else if(process.env.rmq == 'production'){
	rmqUrl = "log-rmq.skinnyfit.com";
	rmqUser = "smashtech";
	rmqPass = "rabbit13242017";
	exports.rmqConnectionString = 'amqp://'+rmqUser+':'+rmqPass+'@'+ rmqUrl;
}
else {
	console.log('');
	console.log('------------------------------------------------------------------------------');
	console.log('You MUST set rmq environment variable. (stage/production) ');
	console.log('------------------------------------------------------------------------------');
	console.log('');
}

exports.logEnv = process.env.commonSetup || process.env.db;


//put these in encrypted file to be deployed with Chef later 
var mongoUser = '';
var mongoPass = '';
var mongoUrl = ''; 
var mongoPort = 27017;
var mongoOptions = '';

if(process.env.db == 'stage'){
	mongoUrl = '127.0.0.1';
}
else if(process.env.db == 'production'){
	mongoUrl = 'api-db.skinnyfit.com';
}
else {
	console.log('');
	console.log('------------------------------------------------------------------------------');
	console.log('You MUST set db environment variable. (stage/production) ');
	console.log('------------------------------------------------------------------------------');
	console.log('');
}

// var url = 'mongodb://'+mongoUser+'%3A'+mongoPass+'%24@'+mongoUrl+':'+mongoPort+'/test'+mongoOptions;
var url = 'mongodb://'+mongoUrl+':'+mongoPort+'/test';

MongoClient.connect(url, function (err, db) {
	if (err)
		console.log("Could NOT connect to mongo server!!! " + mongoUrl, err);
	console.log("Connected to :", mongoUrl);
	exports.db = db;
});

/*
MongoClient.connect(url, function(err, db) {
	
	if(err)
		console.log("Could NOT connect to mongo server!!! " + mongoUrl, err);

  //In the current mongo 3.4 we use db.authenticate enables us to authenticate with the database but in mongo 3.6 it will bundle auth inside the connect method above which does not currently work as an auth method 
  console.log('');
  db.authenticate(mongoUser, mongoPass, function(err, res){

  	exports.db = db;

  	if(err)
			console.log("Could NOT connect to mongo server!!! " + mongoUrl, err);

  	console.log('');

  	if(!err){
	  	//actually use skinnyfit

	
			MongoClient.connect(url, function(err, db) {

				if(err)
					console.log("Could NOT connect to mongo server!!! " + mongoUrl, err);
				else 
			  	console.log("Connected successfully to mongo server at: " + mongoUrl);



	  		
	  	});
		}
  })
   
});
*/



console.log('');
console.log('---------------------------------------------------------');
console.log("DB URL: ", mongoUrl);//WITHOUT PASSWORD AND USERNAME  
console.log("RMQ URL: ", rmqUrl);//WITHOUT PASSWORD AND USERNAME 
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log('---------------------------------------------------------');
console.log('');

exports.ObjectID = ObjectID;


exports.rmqServerName = "content-api";//ideally match repo name 
