'use strict'

const express =require('express');
const app = express ();
const morgan = require('morgan');
routes = require('./routes/recipe');
//settings
 
app.set('port',process.env.PORT || 3000);



//middlewares-procesa datos antes de recibirlos
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// routers

app.use('/api/user',require('./routes/user'));
app.use('/api/region',require('./routes/region'));
app.use('/api/recipe',require('./routes/recipe'));
app.use('/api/ingredient',require('./routes/ingredient'));

//starting the server
app.listen(app.get('port'),() =>{
     console.log(`server on port ${app.get('port')}`);
});