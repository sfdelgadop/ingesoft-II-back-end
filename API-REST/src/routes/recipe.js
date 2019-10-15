'use strict'

var RecipeController = require('../controllers/recipe-controller'),

CommentsController = require('../controllers/comments-controller'),
IngredientController = require('../controllers/ingredient-controller'),
LikesController = require('../controllers/likes-controller'),
RegionController = require('../controllers/region-controller'),

	express = require('express'),
	router = express.Router()
    
router
    /*
    .get('/ver-recipe', RecipeController.getAll)
    .get('/agregar-recipe', RecipeController.addForm)
    .post('/crear-recipe', RecipeController.save)
    .get('/editar/:recipe_id', RecipeController.getOne)
    .put('/actualizar/:recipe_id', RecipeController.save)
    .delete('/eliminar/:recipe_id', RecipeController.delete)
    .use(RecipeController.error404)

    .get('/ver-comments', CommentsController.getAll)
    .get('/agregar-comments', CommentsController.addForm)
    .post('/crear-comments', CommentsController.save)
    .get('/editar-comments/:comment_id', CommentsController.getOne)
    .put('/actualizar-comments/:comment_id', CommentsController.save)
    .delete('/eliminar-comments/:comment_id', CommentsController.delete)
    .use(CommentsController.error404)

    .get('/ver-ingredient', IngredientController.getAll)
    .get('/agregar-ingredient', IngredientController.addForm)
    .post('/crear-ingredient', IngredientController.save)
    .get('/editar-ingredient/:ingredient_id', IngredientController.getOne)
    .put('/actualizar-ingredient/:ingredient_id', IngredientController.save)
    .delete('/eliminar-ingredient/:ingredient_id', IngredientController.delete)
    .use(IngredientController.error404)

    .get('/ver-likes', LikesController.getAll)
    .get('/agregar-likes', LikesController.addForm)
    .post('/crear-likes', LikesController.save)
    .get('/editar-likes/:like_id', LikesController.getOne)
    .put('/actualizar-likes/:like_id', LikesController.save)
    .delete('/eliminar-likes/:like_id', LikesController.delete)
    .use(LikesController.error404)
*/
    //.get('/ver-region', RegionController.getAll)/*
    .get('/agregar-region', RegionController.addForm)
    .post('/', RegionController.save)
    /*.get('/editar-region/:region_id', RegionController.getOne)
    .put('/actualizar-region/:region_id', RegionController.save)
    .delete('/eliminar-region/:region_id', RegionController.delete)
    .use(RegionController.error404)
*/

	
module.exports = router