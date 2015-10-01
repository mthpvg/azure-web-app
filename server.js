/*jslint node:true*/
"use strict";
//-----------------------------------------------------------------------------
//                                     DECLARATIONS
//-----------------------------------------------------------------------------
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -REQUIRES
var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
os = require('os'),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -CONFIG
GLOB = require('./config/GLOBAL'),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -ROUTES
index = require('./routes/webpages/index'),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - VARIABLES
app = express();
//-----------------------------------------------------------------------------
//                                     PROGRAM
//-----------------------------------------------------------------------------
function cpuAverage() {
	
	//Initialise sum of idle and time of cores and fetch CPU info
	var totalIdle = 0, totalTick = 0;
	var cpus = os.cpus();
	
	//Loop through CPU cores
	for(var i = 0, len = cpus.length; i < len; i++) {
		
		//Select CPU core
		var cpu = cpus[i];
		
		//Total up the time in the cores tick
		var type;
		for(type in cpu.times) {
			totalTick += cpu.times[type];
		}     
		
		//Total up the idle time of the core
		totalIdle += cpu.times.idle;
	}
	
	//Return the average Idle and Tick times
	return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

function plop() {
	//Grab first CPU Measure
	var startMeasure = cpuAverage();
	
	//Set delay for second Measure
	setTimeout(function() { 
		
		//Grab second Measure
		var endMeasure = cpuAverage(); 
		
		//Calculate the difference in idle and total time between the measures
		var idleDifference = endMeasure.idle - startMeasure.idle;
		var totalDifference = endMeasure.total - startMeasure.total;
		
		//Calculate the average percentage CPU usage
		var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
		
		//Output result to console
		console.log(percentageCPU + "% CPU Usage.");
		
	}, 100);
	
}

setInterval(plop, 10*1000);






//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -JADE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - FAVICON
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//- - - - - - - - - - - - - - - - - - - - - - - - COOKIE MUST BE BEFORE SESSION
app.use(cookieParser());
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SESSION STORE
app.use(expressSession(
	{
		secret:'soFGmesEMecr652ettoGEXkenh25419rte93JKLMre',
		resave: true,
		saveUninitialized: true
	}
));
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - MORGAN LOGGER
app.use(logger('dev'));
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - BODY PARSER
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -STYLUS
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -PUBLIC
app.use(express.static(path.join(__dirname, 'public')));
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ROUTING
app.use('/', index);
//- - - - - - - - - - - - - - - - - - - - - -CATCH 404 FORWARD TO ERROR HANDLER
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -ERROR HANDLERS
console.log("  + ENV", app.get('env'));
//export NODE_ENV=development
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('./error/error', {
			message: err.message,
			error: err
		});
	});
}
//export NODE_ENV=production
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('./error/error', {
		message: err.message,
		error: {}
	});
});
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -LISTEN
app.listen(process.env.PORT || GLOB.PORT);
//-----------------------------------------------------------------------------
//                                     END
//-----------------------------------------------------------------------------