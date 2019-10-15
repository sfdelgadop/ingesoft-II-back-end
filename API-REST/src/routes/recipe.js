'use strict'

var RecipeController = require('../controllers/recipe-controller'),

CommentsController = require('../controllers/comments-controller'),
IngredientController = require('../controllers/ingredient-controller'),
LikesController = require('../controllers/likes-controller'),
RegionController = require('../controllers/region-controller'),

	express = require('express'),
	router = express.Router()
    
router
    
    .get('/recipe', RecipeController.getAll)/*
    .get('/agregar', RecipeController.addForm)
    .post('/', RecipeController.save)
    .get('/editar/:recipe_id', RecipeController.getOne)
    .put('/actualizar/:recipe_id', RecipeController.save)
    .delete('/eliminar/:recipe_id', RecipeController.delete)
    .use(RecipeController.error404)
/*
    .get('/', CommentsController.getAll)
    .get('/agregar', CommentsController.addForm)
    .post('/', CommentsController.save)
    .get('/editar/:comment_id', CommentsController.getOne)
    .put('/actualizar/:comment_id', CommentsController.save)
    .delete('/eliminar/:comment_id', CommentsController.delete)
    .use(CommentsController.error404)

    .get('/', IngredientController.getAll)
    .get('/agregar', IngredientController.addForm)
    .post('/', IngredientController.save)
    .get('/editar/:ingredient_id', IngredientController.getOne)
    .put('/actualizar/:ingredient_id', IngredientController.save)
    .delete('/eliminar/:ingredient_id', IngredientController.delete)
    .use(IngredientController.error404)

    .get('/', LikesController.getAll)
    .get('/agregar', LikesController.addForm)
    .post('/', LikesController.save)
    .get('/editar/:like_id', LikesController.getOne)
    .put('/actualizar/:like_id', LikesController.save)
    .delete('/eliminar/:like_id', LikesController.delete)
    .use(LikesController.error404)

    .get('/', RegionController.getAll)
    .get('/agregar', RegionController.addForm)
    .post('/', RegionController.save)
    .get('/editar/:region_id', RegionController.getOne)
    .put('/actualizar/:region_id', RegionController.save)
    .delete('/eliminar/:region_id', RegionController.delete)
    .use(RegionController.error404)*/


	
module.exports = router