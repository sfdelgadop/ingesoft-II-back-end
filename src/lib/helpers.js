const bcrypt = require ('bcryptjs')
const helpers ={};

//metodo para encriptar contraseña
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);//genera 10 hash con complejidad logaritmica
    const hash = await bcrypt.hash(password,salt);//recibe patron y password para encriptar la cadena
    return hash;
};

//compara contraseña del login con la cadena guardada en la base de datos
helpers.matchPassword = async(refpassword,dbPassword)=>{
      const result = await bcrypt.compareSync(refpassword, dbPassword);//
      return result;  
}
module.exports = helpers;
