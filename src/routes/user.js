const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');

// GET all Users
//optiene todos los usuarios
router.get('/users', async (_req, res) => {
      mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
      if(err) {
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
router.post('/users', (req, res) => {
  const {firstName, lastName, username, email, password, age, gender} = req.body;
  mysqlConnection.query('INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, 2, ?, ?, 0, 0, 0);',[password, firstName, lastName, username, email,age, gender], 
  (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});
//carga los datos para validacion de login
router.post('/login',(req,res) => {
  const {username,password} = req.body;
    mysqlConnection.query('SELECT * FROM Users WHERE username = ? AND password = ?',
      [username,password],
      (err,rows,fields)=>{
        if(!err){
          res.json({status:'done'});
        }else{
          console.log(err);
        }
      }
    )
});

//PUT User  
//actualiza usuarios
router.put('/users', (req, res) => {

    const {firstName, lastName, username, email, password, age, gender} = req.body;
    mysqlConnection.query('UPDATE Users SET password = ?, name_user = ?,last_name = ?,username = ?,'
    +'email = ?,'
    +'age = ?,'
    +'gender = ?'
    +'WHERE email = ?',[password,firstName,lastName,username,email, age, gender,email], (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});

//DELETE User  
//elimina usuarios de la base de datos
router.delete('/users', (req, res) => {

  const {id_user} = req.body;
  mysqlConnection.query('DELETE FROM Users WHERE id_user=?;',[id_user], (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});
//exporta el modulo de conexion con mysql
module.exports=router;


