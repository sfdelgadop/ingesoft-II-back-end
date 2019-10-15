const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');

// GET all Users
router.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
      if(err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });  
  });

// GET any User
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

//PUT User  

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
module.exports=router;


