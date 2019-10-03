const {Router} = require('express');
const router = Router();
const _= require('underscore');
 
const recipes = require('../models json/recipe.json');
console.log(recipes);

// routes
router.get('/',(req,res)=>{
    res.json(recipes);
});

router.post('/',(req,res)=>{
    
    const { id_recipe,name_recipe, type_recipe, details, likes, creator } = req.body; //const apartes almacena
    const newRecipe = { ...req.body }; //... 3 puntos para traer todos los datos
    if (id_recipe && name_recipe && type_recipe && details &&  likes && creator ) {
        recipes.push(newRecipe);
        res.json(recipes);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_recipe,name_recipe, type_recipe, details, likes, creator } = req.body;//ATRIBUTOS
    if (id_recipe && name_recipe && type_recipe && details &&  likes && creator ) {
        _.each(recipes, (recipe, i) => {
            if (recipe.id_recipe === id) {
                recipe.name_recipe =name_recipe;
                recipe.type_recipe = type_recipe;
                recipe.details = details;
                recipe.likes = likes;
                recipe.creator = creator;
            }
        });
        res.json(recipes);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(recipes, (recipe, i) => {
            if (recipe.id_recipe == id) {
                recipes.splice(i, 1);
            }
        });
        res.json(recipes);
    }
});


module.exports=router;