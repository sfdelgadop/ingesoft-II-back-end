'use strict'

var IngredientController = require('../controllers/ingredient-controller'),

	express = require('express'),
	router = express.Router()
    
router

    .get('/ver-ingredient', IngredientController.getAll)
    .get('/agregar-ingredient', IngredientController.addForm)
    .post('/crear-ingredient', IngredientController.save)
    .get('/editar-ingredient/:ingredient_id', IngredientController.getOne)
    .put('/actualizar-ingredient/:ingredient_id', IngredientController.save)
    .delete('/eliminar-ingredient/:ingredient_id', IngredientController.delete)
    .use(IngredientController.error404)

 

	
module.exports = router