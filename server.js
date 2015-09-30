/*jslint node:true*/
"use strict";
//-----------------------------------------------------------------------------
//                                     DECLARATIONS
//-----------------------------------------------------------------------------
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -REQUIRES
var express = require('express'),
// path = require('path'),
// favicon = require('serve-favicon'),
// logger = require('morgan'),
// bodyParser = require('body-parser'),
// cookieParser = require('cookie-parser'),
// expressSession = require('express-session'),
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -CONFIG
GLOB = require('./config/GLOBAL'),
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -ROUTES
// index = require('./routes/webpages/index'),
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - VARIABLES
app = express();
//-----------------------------------------------------------------------------
//                                     PROGRAM
//-----------------------------------------------------------------------------
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -JADE
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - FAVICON
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// //- - - - - - - - - - - - - - - - - - - - - - - - COOKIE MUST BE BEFORE SESSION
// app.use(cookieParser());
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SESSION STORE
// app.use(expressSession(
// 	{
// 		secret:'soFGmesEMecr652ettoGEXkenh25419rte93JKLMre',
// 		resave: true,
// 		saveUninitialized: true
// 	}
// ));
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - MORGAN LOGGER
// app.use(logger('dev'));
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - BODY PARSER
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -STYLUS
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -PUBLIC
// app.use(express.static(path.join(__dirname, 'public')));
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ROUTING
app.use('/', function (req, res, next) {
	res.send('hello world')
});
//- - - - - - - - - - - - - - - - - - - - - -CATCH 404 FORWARD TO ERROR HANDLER
// app.use(function (req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });
// //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -ERROR HANDLERS
// console.log("  + ENV", app.get('env'));
// //export NODE_ENV=development
// if (app.get('env') === 'development') {
// 	app.use(function (err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.render('./error/error', {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }
// //export NODE_ENV=production
// app.use(function (err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.render('./error/error', {
// 		message: err.message,
// 		error: {}
// 	});
// });
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -LISTEN
app.listen(process.env.PORT || GLOB.PORT);
//-----------------------------------------------------------------------------
//                                     END
//-----------------------------------------------------------------------------