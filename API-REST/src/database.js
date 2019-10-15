const mysql = require("mysql");

const { database } = require("./keys");

//const {promisify} = require('util');

const mysqlConnection = mysql.createConnection(database);;//recibe objeto de configuracion de la base de datos

mysqlConnection.connect(function(err){
  if (err) {
    console.log(err);
    return;
    /*if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }else if(connection) connection.release();
    console.log('Database is connected');
    return;*/
}else{
  console.log('DB is connected');
}
});
// pool querys callbacks convertidas a promesas
//mysqlconnection.query = promisify(mysqlconnection.query);

module.exports =mysqlConnection;