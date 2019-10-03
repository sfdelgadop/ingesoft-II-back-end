const {Router} = require('express');
const router = Router();
const _= require('underscore');
 
const ingredients = require('../models json/ingredient.json');
console.log(ingredients);

// routes
router.get('/',(req,res)=>{
    res.json(ingredients);
});

router.post('/',(req,res)=>{
   
    const { id_ingredient, name_ingredient , type_ingredient } = req.body; //const apartes almacena
    const newIngredient = { ...req.body}; //... 3 puntos para traer todos los datos
    if ( id_ingredient && name_ingredient && type_ingredient ) {
        ingredients.push(newIngredient);
        res.json(ingredients);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_ingredient, name_ingredient , type_ingredient } = req.body;//ATRIBUTOS
    if (id_ingredient && name_ingredient && type_ingredient ) {
        _.each(ingredients, (ingredient, i) => {
            if (ingredient.id_ingredient === id) {
                ingredient.name_ingredient =name_ingredient;
                ingredient.type_ingredient = type_ingredient;
            }
        });
        res.json(ingredients);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(ingredients, (ingredient, i) => {
            if (ingredient.id_ingredient == id) {
                ingredients.splice(i, 1);
            }
        });
        res.json(ingredients);
    }
});


module.exports=router;