const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');

const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });
// GET all Users
// muestra todos los seguidores 
router.get('/follows',auth, (req, res) => {
    mysqlConnection.query('SELECT * FROM Follows', (err, rows, fields) => {
      if(err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });  
  });

// GET any rol
//muestra algun usuario en particular
router.get('/follows:id', auth, (req, res) => {
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