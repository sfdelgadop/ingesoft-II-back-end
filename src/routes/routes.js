'use strict'
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false });
var LikesController = require('../controllers/likes-controller'),
RegionController = require('../controllers/region-controller'),
 RecipeController = require('../controllers/recipe-controller'),
 IngredientController = require('../controllers/ingredient-controller'),
 CommentsController = require('../controllers/comments-controller'),

	express = require('express'),
	router = express.Router()
    
    .get('/buscar-recipe',auth, RecipeController)
    .get('/ver-recipe',auth, RecipeController.getAll)
    .get('/agregar-recipe',auth, RecipeController.addForm)
    .post('/crear-recipe',auth, RecipeController.save)
    .get('/buscar-recipe-by-ingredients/:ingredients',auth, RecipeController.getPosibleRecipes)
    .get('/buscar-recipe-by-name/:name',auth, RecipeController.getRecipe)
    .get('/editar/:recipe_id',auth, RecipeController.getOne)
    .put('/actualizar/:recipe_id',auth, RecipeController.save)
    .delete('/eliminar/:recipe_id',auth, RecipeController.delete)
   

    .get('/ver-region',auth, RegionController.getAll)
    .get('/agregar-region',auth, RegionController.addForm)
    .post('/crear-region',auth, RegionController.save)
    .get('/editar-region/:id_region',auth, RegionController.getOne)
    .put('/actualizar-region/:id_region',auth, RegionController.save)
    .delete('/eliminar-region/:id_region',auth, RegionController.delete)


    .get('/ver-likes',auth, LikesController.getAll)
    .get('/agregar-likes',auth, LikesController.addForm)
    .post('/crear-likes',auth, LikesController.save)
    .get('/editar-likes/:like_id',auth, LikesController.getOne)
    .put('/actualizar-likes/:like_id',auth, LikesController.save)
    .delete('/eliminar-likes/:like_id',auth, LikesController.delete)


    .get('/ver-ingredient',auth, IngredientController.getAll)
    .get('/agregar-ingredient',auth, IngredientController.addForm)
    .post('/crear-ingredient',auth, IngredientController.save)
    .get('/editar-ingredient/:ingredient_id',auth, IngredientController.getOne)
    .put('/actualizar-ingredient/:ingredient_id',auth, IngredientController.save)
    .delete('/eliminar-ingredient/:ingredient_id',auth, IngredientController.delete)


    .get('/ver-comments',auth, CommentsController.getAll)
    .get('/agregar-comments',auth, CommentsController.addForm)
    .post('/crear-comments/',auth, CommentsController.save)
    .get('/editar-comments/:comment_id',auth, CommentsController.getOne)
    .put('/actualizar-comments/:comment_id',auth, CommentsController.save)
    .delete('/eliminar-comments/:comment_id',auth, CommentsController.delete)

    

module.exports = router