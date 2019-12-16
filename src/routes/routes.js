'use strict'

var LikesController = require('../controllers/likes-controller'),
RegionController = require('../controllers/region-controller'),
 RecipeController = require('../controllers/recipe-controller'),
 IngredientController = require('../controllers/ingredient-controller'),
 CommentsController = require('../controllers/comments-controller'),

	express = require('express'),
	router = express.Router()
    
router
    .get('/buscar-recipe',RecipeController)
    .get('/ver-recipe', RecipeController.getAll)
    .get('/agregar-recipe', RecipeController.addForm)
    .post('/crear-recipe', RecipeController.save)
    .get('/buscar-recipe-by-ingredients/:ingredients', RecipeController.getPosibleRecipes)
    .get('/buscar-recipe-by-name/:recipe', RecipeController.getRecipe)
    .get('/editar/:recipe_id', RecipeController.getOne)
    .put('/actualizar/:recipe_id', RecipeController.save)
    .delete('/eliminar/:recipe_id', RecipeController.delete)
   

    .get('/ver-region', RegionController.getAll)
    .get('/agregar-region', RegionController.addForm)
    .post('/crear-region', RegionController.save)
    .get('/editar-region/:id_region', RegionController.getOne)
    .put('/actualizar-region/:id_region', RegionController.save)
    .delete('/eliminar-region/:id_region', RegionController.delete)


    .get('/ver-likes', LikesController.getAll)
    .get('/agregar-likes', LikesController.addForm)
    .post('/crear-likes', LikesController.save)
    .get('/editar-likes/:like_id', LikesController.getOne)
    .put('/actualizar-likes/:like_id', LikesController.save)
    .delete('/eliminar-likes/:like_id', LikesController.delete)


    .get('/ver-ingredient', IngredientController.getAll)
    .get('/agregar-ingredient', IngredientController.addForm)
    .post('/crear-ingredient', IngredientController.save)
    .get('/editar-ingredient/:ingredient_id', IngredientController.getOne)
    .put('/actualizar-ingredient/:ingredient_id', IngredientController.save)
    .delete('/eliminar-ingredient/:ingredient_id', IngredientController.delete)


    .get('/ver-comments', CommentsController.getAll)
    .get('/agregar-comments', CommentsController.addForm)
    .post('/crear-comments/', CommentsController.save)
    .get('/editar-comments/:comment_id', CommentsController.getOne)
    .put('/actualizar-comments/:comment_id', CommentsController.save)
    .delete('/eliminar-comments/:comment_id', CommentsController.delete)

    

module.exports = router