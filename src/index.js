'use strict'

const express = require('express');
const morgan = require('morgan');
//const pool = require('./database');
//const bodyParser = require('body-parser');
const app = express();
//settings
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//app.set('port',process.env.PORT || 4000)






var favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	restFul = require('express-method-override')('_method'),
	routes = require('./routes/routes'),
	cors = require('cors'),

	faviconURL = `${__dirname}/public/img/node-favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3000 || 27017 || 4000)

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
	


module.exports = app




//-------OAUTH2-----------------------------------------------


//active oaut-before call routes
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: false,
	resave: false,
	store: new FileStore()
  }));



  app.use('/api', require('./controllers/user-controller'));

  function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}


//------------END OAUTH-----------------

app.use(auth);

// routes

/*
app.use('/api/region',require('./routes/region'));
app.use('/api/recipe',require('./routes/recipe'));
app.use('/api/ingredient',require('./routes/ingredient'));*/
//app.use(require('./routes/user'));
//app.use(require('./routes/rol'));
//app.use(require('./routes/followers'));
// routers


app.use(routes);

//app.use('/api', require('./routes/user'));
//app.use('/api', require('./DAO/userDAO'));

//app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/rol'));
app.use('/api', require('./routes/followers'));





//starting the server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});


