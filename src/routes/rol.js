const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');

const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });
// GET all roles
//muestra todos los roles
router.get('/', auth, (req, res) => {
    mysqlConnection.query('SELECT * FROM Rol', (err, rows, fields) => {
      if(err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });  
  });

// GET any rol
//muestra algun rol
router.get('/:id', auth,(req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM Rol WHERE id_rol = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

//POST rol  
//guarda un rol en la base de datos 
router.post('/',  auth,(req, res) => {
  const {name_rol} = req.body;
  mysqlConnection.query('INSERT INTO `Rol` (id_rol, name_rol) VALUES (null,?);',[name_rol], (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});

//PUT rol  
//actualiza rol de usuario
router.put('/', auth,(req, res) => {

  const {name_rol,id_rol} = req.body;
  mysqlConnection.query('UPDATE Rol SET name_rol = ? WHERE id_rol = ?',[name_rol,id_rol], (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});

//DELETE rol  
//elimina rol de la base de datos
router.delete('/', auth,(req, res) => {

  const {id_rol} = req.body;
  mysqlConnection.query('DELETE FROM Rol WHERE id_rol=?;',[id_rol], (err, rows, fields) => {
      if (!err) {
        res.json({status: 'done'});
      } else {
        console.log(err);
      }
    });

});


module.exports = router;
