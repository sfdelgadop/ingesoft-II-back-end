const { Router } = require('express');
const router = Router();
const DAO = require('../DAO/userDAO');
//se crean variables requeridas por el controlador para guardar o crear consultas sql
let { user } = require('../models json/userModel');//objetos con atributos necesarios
let helper = require('../lib/helpers');//modulo para encriptacion  

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
  let compare = await helper.matchPassword(user.userLogin.password, dbpassword);//metodo  de comparacion de contraseñas  
  if (compare) {
    res.status(200).send('authorized user');//usuario autorizado
  } else {
    res.status(401).send('wrong password');//contraseña incorrecta
  }

});
//guarda en un json los datos recibidos para la base de datos
router.post('/users', async (req, res) => {
  let userjson = await req.body;
  let exists = await DAO.loginUser(userjson.username);;
  //verifica que el usuario no este registrado
  if(exists[0]!=undefined){
    res.status(401).send('Unsername have registred');//si el nombre de usuario ya existe
  }else{
    console.log(userjson);
    //guarda el usuario recibido
    user.userAdd = await DAO.loginUser(userjson);
    res.status(200).send('Unsername not have registred');
  }
});









/*user = req.body;
console.log(user);
const encrypted = await helper.encryptPassword(user.password);//guarda contraseña recibida del formulario web
mysqlConnection.query('INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, 2, ?, ?, 0, 0, 0);', 
[encrypted, user.firstName, user.lastName, user.username, user.email, user.age, user.gender],
  async(err, rows, fields) => {
    if (!err) {
      return res.json({ status: 'done' });
    } else {
      if(err.sqlMessage==="Duplicate entry '"+user.username+"' for key 'username'"){//en caso que el usuario ya este registrado
        return res.json({ status: 'username was registred'});
      }else if (err.sqlMessage==="Duplicate entry '"+user.email+"' for key 'email'") {//en caso de que que el email exista
        return res.json({ status: 'email already exist'});
      }
    }
  });

});*/
module.exports = router;
