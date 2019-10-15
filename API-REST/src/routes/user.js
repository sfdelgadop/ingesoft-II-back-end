const {Router} = require('express');
const router = Router();
<<<<<<< HEAD
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




=======
const _= require('underscore');
 
const users = require('../models json/user.json');
console.log(users);

// routes
router.get('/',(req,res)=>{
    res.json(users);
});

router.post('/',(req,res)=>{
    const { id_user,password,name_user,lastname,age,gender,followers,following,favorities } = req.body; //const apartes almacena
    const newUser = { ...req.body }; //... 3 puntos para traer todos los datos
    if (id_user && password && name_user && lastname && age && gender && followers && following && favorities) {
        users.push(newUser);
        res.json(users);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_user,password,name_user,lastname,age,gender,followers,following,favorities } = req.body;//ATRIBUTOS
    if (id_user && password && name_user && lastname && age && gender && followers && following && favorities ) {
        _.each(users, (user, i) => {
            if (user.id_user === id) {
                user.password =password;
                user.name_user=name_user;
                user.lastname = lastname;
                user.age =age;
                user.gender=gender;
                user.followers=followers;
                user.following=following;
                user.favorities=favorities;
            }
        });
        res.json(users);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(users, (user, i) => {
            if (user.id_user == id) {
                users.splice(i, 1);
            }
        });
        res.json(users);
    }
});


module.exports=router;
>>>>>>> 01c1d05c2de7d3ec3523b9bcba34fb4c50afbc5c
