const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../database');
var nodemailer = require('nodemailer');

var ObserverDP = () => {}

//obtiene todos los usuarios y guarda sus correos en un arreglo
ObserverDP.getAll = async function(name_recipe,_req, res){

    var query = await mysqlConnection.query('SELECT * FROM Users');
    var us= {};
    var mails = "'";
    for(i in query){
        us[i]= JSON.parse(JSON.stringify(query[i]));
        
    }
    //console.log(us[0]['user_id']);
    //console.log( us.size());
    
    for(var i = 0, s = Object.keys(us).length; i < s; i++){

        us[i]=us[i]['email'];
        if(i<s-1){
            mails+=us[i]+", ";
        }else{
            mails+=us[i];
        }
    }
    mails+="'";
    //console.log(mails);
    //Llama a la función que envia los correos recibiendo un arreglo de correos y el nombre de la receta
    ObserverDP.sendMails(mails,name_recipe, res);
    
}
      
ObserverDP.sendMails = function(mails,name_recipe, res){
    
    //console.log(mails);
    // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'kyocerascannerunid@gmail.com',
                pass: 'Adminfc2020'
            }
        });
    // Definimos el email
    
    var mailOptions = {
        from: 'Remitente',
        to: mails,
        subject: 'Nueva receta posteada, ven a descubrir nuevos sabores',
        text: `Hola te informamos que una nueva receta llamada ${name_recipe} ha sido subida y ya está disponible para que la descubras \nAtt: El equipo de Master cheif`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            //res.send(500, err.message);
        } else {
            console.log("Email sent");
            //res.status(200).jsonp(req.body);
        }
    });
    };
   

module.exports=ObserverDP;
