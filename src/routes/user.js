const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');
const helper = require('../lib/helpers');
// GET all Users
//optiene todos los usuarios
router.get('/users', async (_req, res) => {
  mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });

});

// GET any User
//optiene algun usuario en particular
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM Users WHERE id_user = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//POST User 
//crea un usuario en la base de datos
router.post('/users', async (req, res) => {
  //guarda en un json los datos recibidos para la base de datos
  const { firstName, lastName, username, email, password, age, gender } = req.body;
  const encrypted = await helper.encryptPassword(password);//guarda contraseña recibida del formulario web
  mysqlConnection.query('INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, 2, ?, ?, 0, 0, 0);', [encrypted, firstName, lastName, username, email, age, gender],
    async(err, rows, fields) => {
      if (!err) {
        return res.json({ status: 'done' });
      } else {
        if(err.sqlMessage==="Duplicate entry '"+username+"' for key 'username'"){//en caso que el usuario ya este registrado
          return res.json({ status: 'username was registred'});
        }else if (err.sqlMessage==="Duplicate entry '"+email+"' for key 'email'") {//en caso de que que el email exista
          return res.json({ status: 'email already exist'});
        }
      }
    });

});
//10 noviembre comparacion de contraseña de login con contraseña base de datos 
//carga los datos para validacion de login
router.post('/login', async (req, res) => {
  const { username, password } = await req.body;
  let dbpassword;//contraseña guardada en la base de datos
  mysqlConnection.query('SELECT password FROM Users WHERE username = ?;',
    [username],
    async (err, rows, fields) => {
      if (!err) {
        if(rows.toString()==''){//en caso de que el usuario no exista
          res.json({ status: 'username not exist' });
        }else{
        dbpassword = await rows[0].password;//optiene contraseña cifrada de la base de datos
        let compare = await helper.matchPassword(password, dbpassword);//metodo  de comparacion de contraseñas
        if (compare) {
          res.json({ status: 'done' });
        } else {
          res.json({ status: 'authentication failed' });//la contraseña es incorrecta
        }
      }
      } else {
        console.log(err);//caso de error del método 
      }
    }
  )
});

//PUT User  
//actualiza usuarios
router.put('/users', (req, res) => {

  const { firstName, lastName, username, email, password, age, gender } = req.body;
  mysqlConnection.query('UPDATE Users SET password = ?, name_user = ?,last_name = ?,username = ?,'
    + 'email = ?,'
    + 'age = ?,'
    + 'gender = ?'
    + 'WHERE email = ?', [password, firstName, lastName, username, email, age, gender, email], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'done' });
      } else {
        console.log(err);
      }
    });

});

//DELETE User  
//elimina usuarios de la base de datos
router.delete('/users', (req, res) => {

  const { id_user } = req.body;
  mysqlConnection.query('DELETE FROM Users WHERE id_user=?;', [id_user], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'done' });
    } else {
      console.log(err);
    }
  });

});
//exporta el modulo de conexion con mysql
module.exports = router;


