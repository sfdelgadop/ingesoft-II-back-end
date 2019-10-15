'use strict'

var RecipeController = require('../controllers/recipe-controller')

	express = require('express'),
	router = express.Router()
    
router
    
    .get('/ver-recipe', RecipeController.getAll)
    .get('/agregar-recipe', RecipeController.addForm)
    .post('/crear-recipe', RecipeController.save)
    .get('/editar/:recipe_id', RecipeController.getOne)
    .put('/actualizar/:recipe_id', RecipeController.save)
    .delete('/eliminar/:recipe_id', RecipeController.delete)
    .use(RecipeController.error404)

   
module.exports = router