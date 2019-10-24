const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');

// GET all Users
router.get('/follows', (req, res) => {
    mysqlConnection.query('SELECT * FROM Follows', (err, rows, fields) => {
      if(err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });  
  });

// GET any rol
router.get('/follows:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM Rol WHERE id_following = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});  
   
  module.exports=router;