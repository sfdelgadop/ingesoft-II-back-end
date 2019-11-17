const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');
var nodemailer = require('nodemailer');

/*// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com',
            pass: 'password'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: 'destinatario@gmail.com',
    subject: 'Asunto',
    text: 'Contenido del email'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};*/

var ObserverDP = () => {}


// GET all Users
//optiene todos los usuarios
ObserverDP.getAll = async () => {
    console.log("hola");
        
    mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
  console.log(res);

}
      
ObserverDP.sendMails = function(req, res){
    // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'kyocerascanner@gmail.com',
                pass: 'Adminfc2020'
            }
        });
    // Definimos el email
    var mailOptions = {
        from: 'Remitente',
        to: 'destinatario@gmail.com',
        subject: 'Asunto',
        text: 'Contenido del email'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
    };
   

module.exports=ObserverDP;
