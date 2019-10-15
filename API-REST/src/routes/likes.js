const {Router} = require('express');
const router = Router();
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