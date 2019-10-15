const express =require('express');
<<<<<<< HEAD
const morgan = require('morgan');
//const pool = require('./database');
//const bodyParser = require('body-parser');
const app = express ();
//settings
 
app.set('port',process.env.PORT || 4000);
=======
const app = express ();
const morgan = require('morgan');

//settings
 
app.set('port',process.env.PORT || 3000);
>>>>>>> 01c1d05c2de7d3ec3523b9bcba34fb4c50afbc5c



//middlewares-procesa datos antes de recibirlos
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

<<<<<<< HEAD
// routes

/*
app.use('/api/region',require('./routes/region'));
app.use('/api/recipe',require('./routes/recipe'));
app.use('/api/ingredient',require('./routes/ingredient'));*/
app.use(require('./routes/user'));
app.use(require('./routes/rol'));
app.use(require('./routes/followers'));
=======
// routers

app.use('/api/user',require('./routes/user'));
app.use('/api/region',require('./routes/region'));
app.use('/api/recipe',require('./routes/recipe'));
app.use('/api/ingredient',require('./routes/ingredient'));
>>>>>>> 01c1d05c2de7d3ec3523b9bcba34fb4c50afbc5c

//starting the server
app.listen(app.get('port'),() =>{
     console.log(`server on port ${app.get('port')}`);
});