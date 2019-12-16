const { Router } = require('express');
const router = Router();
const mysqlConnection = require('../database');
const helper = require('../lib/helpers');
let {user} = require('../models json/userModel'); 
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const auth = passport.authenticate('jwt', { session: false });

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
// GET all Users
//optiene todos los usuarios
 // create some helper functions to work on the database
 
//-----------SEQUELIZE------------------------
const Sequelize = require ('sequelize'); 
// inicializa una instancia de Sequelize 
const sequelize = new Sequelize ({ 
  database: 'relational_db', 
  username: 'root', 
  password: 'admin', 
  dialect: 'mysql', 
}); 
// verifique la secuencia de conexión de 
sequelize 
  .authenticate () 
  .then (() => console.log ('La conexión se ha establecido con éxitos.')) 
  .catch (err => console.error ('No se puede conectar a la base de datos: ', err));


// create user model
const User = sequelize.define('user', {
    
    password: {
      type: Sequelize.STRING,
    },
    name_user: {
        type: Sequelize.STRING,
      },
    last_name: {
        type: Sequelize.STRING,
      },
    username: {
        type: Sequelize.STRING,
      },
    email: {
        type: Sequelize.STRING,
      },
    id_rolf: {
        type: Sequelize.INTEGER,
      },
    age: {
        type: Sequelize.INTEGER,
      },
     gender: {
        type: Sequelize.STRING,
      },
    followers: {
        type: Sequelize.INTEGER,
      },
    followings: {
        type: Sequelize.INTEGER,
      },
    favourities: {
        type: Sequelize.INTEGER,
      }
  });
  
  // create table with user model
  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));
  

 const createUser = async ({ password, name_user, last_name, username, email, id_rolf, age, gender, followers, followings, favourities }) => {
  return await User.create({ password, name_user, last_name, username, email, id_rolf, age, gender, followers, followings, favourities });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};



// get all users
router.get('/users', auth, function(req, res) {
  getAllUsers().then(user => res.json(user));
});

// register route
router.post('/register', function(req, res, next) {
  const { password, name_user, last_name, username, email, id_rolf, age, gender, followers, followings, favourities } = req.body;
  createUser({ password, name_user, last_name, username, email, id_rolf, age, gender, followers, followings, favourities }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});

//login route
router.post('/login', async function(req, res, next) {
  console.log("here pass");
  const { username, password } = req.body;
  if (username && password) {
    let user = await getUser({ username: username });
    if (!user) {
      res.status(401).json({ msg: 'No such user found' });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});

// protected route
router.get('/protected', auth, function(req, res) {
  res.json('Success! You can now see this without a token.');
});
//exporta el modulo de conexion con mysql
module.exports = router;


