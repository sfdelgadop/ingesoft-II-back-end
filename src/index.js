'use strict'

const express = require('express');
const morgan = require('morgan');
//const pool = require('./database');
//const bodyParser = require('body-parser');
const app = express();
//settings

const passport = require('passport');
//app.set('port',process.env.PORT || 4000)

//-----------------------------------------------------

var favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	restFul = require('express-method-override')('_method'),
	routes = require('./routes/routes'),
	cors = require('cors'),

	faviconURL = `${__dirname}/public/img/node-favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3000 || 27017 || 4000)
	app.use(passport.initialize());
app
	.use(cors())
	.set('port', port)
	.use(bodyParser.json({limit: '50mb'}))
	.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))

	.use(favicon(faviconURL))

	// parse application/json

	.use(express.urlencoded({ extended: false }))
	.use(express.json())

	.use(bodyParser.json())
	// parse application/x-www-form-urlencoded
	.use(bodyParser.urlencoded({ extended: false }))
	.use(restFul)
	.use(morgan('dev'))
	.use(publicDir)
	.use(routes)


module.exports = app

// routes

/*
app.use('/api/region',require('./routes/region'));
app.use('/api/recipe',require('./routes/recipe'));
app.use('/api/ingredient',require('./routes/ingredient'));*/
//app.use(require('./routes/user'));
//app.use(require('./routes/rol'));
//app.use(require('./routes/followers'));
// routers

//app.use('/api', require('./routes/user'));
//app.use('/api', require('./DAO/userDAO'));
//app.use('/api', require('./controllers/user-controller'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/rol'));
app.use('/api', require('./routes/followers'));
// set some basic routes
 

//starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});

