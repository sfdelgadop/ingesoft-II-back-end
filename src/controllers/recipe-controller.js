'use strict'

var SearchModel = require('./search_ingredient');

var ObserverDP = require('./observer');

var RecipeModel = require('../models json/recipe-model'),
	RecipeController = () => {}

//Llama la función que trae todos los comentarios y lo guaarda en un JSON
RecipeController.getAll = (req, res, next) => {
	console.log("hola")
	RecipeModel.getAll((docs) => {
		let locals = {
			title : 'Lista de Recetas',
			data : docs
		}

		res.send( docs)
	})
}
//Llama la función que trae una receta

RecipeController.getOne = (req, res, next) => {
	let recipe_id = req.params.recipe_id
	console.log(recipe_id)

	RecipeModel.getOne(recipe_id, (docs) => {
		let locals = {
			title : 'Editar Película',
			data : docs
		}

		res.send( locals)
	})
}
//llama la funcion que trae las posibles combinaciones de ingredientes
RecipeController.getPosibleRecipes = (req, res, next) => {
	let ingredients = req.params.ingredients;
	//console.log(req.params.ingredients);
	
	RecipeModel.getPosibleRecipes(ingredients, (docs) => {
		let locals = {
			title : 'Recetas',
			data : docs
		}

		res.send( locals)
	})
}

//Llama la función que guarda una receta
RecipeController.save = (req, res, next) => {
	//Calcula el valor hash de la receta y la guarda con ese id
	var hash= SearchModel.hashRecipe(req.body.ingredients);
	//console.log(SearchModel.getPosibilities(req.body.ingredients));
	
	//llama el observer que enviará correos notificacnod una nueva receta
	ObserverDP.getAll(req.body.name);
	
	 
	let recipe = {
		id : hash,
		name : req.body.name,
		user_id : req.body.user_id,
		ingredients : req.body.ingredients,
		description : req.body.description,
        procedure : req.body.procedure,
        photos : req.body.photos,
        created_at : req.body.date
	}

	//console.log(recipe)

	RecipeModel.save( recipe, () => res.redirect('/ver-recipe') )
}

//Llama la función que elimina una receta
RecipeController.delete = (req, res, next) => {
	let recipe_id = req.params.recipe_id
	console.log(recipe_id)

	RecipeModel.delete( recipe_id, () => res.redirect('/') )
}

RecipeController.addForm = (req, res, next) => res.send('add-recipe', { title : 'Agregar Receta' })

RecipeController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.send( locals)

	next()
}

module.exports = RecipeController