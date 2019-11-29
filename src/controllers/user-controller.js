const { Router } = require('express');
const router = Router();
const DAO = require('../DAO/userDAO');
//se crean variables requeridas por el controlador para guardar o crear consultas sql
let { user } = require('../models json/userModel');//objetos con atributos necesarios
let helper = require('../lib/helpers');//modulo para encriptacion  
const bodyParser = require('body-parser');


router.use(bodyParser.json());
// GET Users
//optiene todos los llamando DAO de obtener todos los usuarios
router.get('/users', async (req, res) => {
  user.userGetAll = await DAO.getAll;
  res.json(user.userGetAll);

});
// GET any Users
//optiene algun usuario en particular llamando DAO y recibiendo un parametro
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  user.userGetAny = await DAO.getAny(id);
  res.json(user.userGetAny);
});
//Login User
//implemeta metods de validacion y autorizacion de usuarios y manejo de errores
/*
router.post('/login', async (req, res) => {
  user.userLogin = await req.body;
  let userjson = user.userLogin;
  userjson = await DAO.loginUser(userjson.username);
  if (userjson.toString() == '') {
    res.status(401).send('Unsername not exist');//usuario ha sido mal ingresado o no se ha registrado
    //res.json({ status: 'authentication failed' });
  }
  let dbpassword = await userjson[0].password;//contraseña encriptada de la base de datos
  console.log(dbpassword);
  console.log(user.userLogin.password);
  //let compare = await helper.matchPassword(user.userLogin.password, dbpassword);//metodo  de comparacion de contraseñas  
  if (dbpassword==user.userLogin.password) {//remplazando compare
    res.status(200).send('authorized user');//usuario autorizado
  } else {
    res.status(401).send('wrong password');//contraseña incorrecta
  }

});*/


router.post('/login',async (req, res, next) => {

  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var usernametxt = auth[0];
    var passwordtxt = auth[1];


    userjson =  await DAO.loginUser(usernametxt);
    if (userjson.toString() == '') {
      res.status(401).send('Unsername not exist');//usuario ha sido mal ingresado o no se ha registrado
      //res.json({ status: 'authentication failed' });
    }
    console.log(usernametxt);
    
    let dbusername =  await userjson[0].username;
    let dbpassword =  await userjson[0].password;//contraseña encriptada de la base de datos
    console.log(dbpassword);
    console.log(passwordtxt);
    //let compare = await helper.matchPassword(user.userLogin.password, dbpassword);//metodo  de comparacion de contraseñas  
    if (dbpassword!==passwordtxt) {//remplazando compare
      var err = new Error('Your password is incorrect!');
      err.status = 403;
      return next(err);
    } else if(dbusername === usernametxt && dbpassword === passwordtxt){
      req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')
    }
  
 
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
})

//Crear usuario
//guarda en un json los datos recibidos para la base de datos
router.post('/users', async (req, res) => {
  let userjson = await req.body;
  let exists = await DAO.loginUser(userjson.username);
  //verifica que el usuario no este registrado
  if (exists[0] != undefined) {
    res.status(401).send('Unsername was registred');//si el nombre de usuario ya existe
  } else {
    let existsemail = await DAO.emailUser(userjson.email);
    if (existsemail[0] != undefined) {
      res.status(401).send('email was registred');//si el email de usuario ya existe
    }else{
    userjson.password = await helper.encryptPassword(userjson.password);//guarda contraseña recibida del formulario web
    //guarda el usuario recibido en la base de datos
    user.userAdd = await DAO.createUser(userjson);
    res.status(200).send('Unsername has been created');
    }

  }
});


router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
