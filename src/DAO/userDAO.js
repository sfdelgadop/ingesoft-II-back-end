const mysqlConnection = require('../database');
// GET all Users
//exporta todos los usuarios con una consulta y devolviendo un objeto DATAROWPACKET
module.exports.getAll = mysqlConnection.query('SELECT * FROM Users');
// GET any User
//exporta un usuario en particular con un objeto DATAROWPACKET
module.exports.getAny = async function (id) {
  const userGetAll = await mysqlConnection.query('SELECT * FROM Users WHERE id_user = ?', [id]);
  return userGetAll;
};

module.exports.loginUser = async function (username) {
  const userlogin = await mysqlConnection.query('SELECT username,password FROM Users WHERE username = ?;', [username]);
  return userlogin;
};
module.exports.createUser = async function (user) {
  const userlogin = await mysqlConnection.query(
    'INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, 2, ?, ?, 0, 0, 0);',
    [user.password, user.firstName, user.lastName, user.username, user.email, user.age, user.gender])
};
module.exports.emailUser = async function (email) {
  const useremail = await mysqlConnection.query('SELECT email FROM Users WHERE email = ?;', [email]);
  return useremail;
};





//return await Promise(query);





/*function (){
  return mysqlConnection.query('SELECT * FROM Users WHERE id_user = 10005')};
  //console.log('asyncronus');*/

/*const userAnyAll =mysqlConnection.query('SELECT * FROM Users WHERE id_user = ?', ["2"], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });*/


