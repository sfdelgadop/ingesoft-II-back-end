'use strict'

var RecipeModel = require('../models json/recipe-model'),
	RecipeController = () => {}

RecipeController.getAll = (req, res, next) => {
	//console.log("hola")
	RecipeModel.getAll((docs) => {
		let locals = {
			title : 'Lista de Recetas',
			data : docs
		}

		//res.render('index', locals)
	})
}

RecipeController.getOne = (req, res, next) => {
	let recipe_id = req.params.recipe_id
	console.log(recipe_id)

	RecipeModel.getOne(recipe_id, (docs) => {
		let locals = {
			title : 'Editar Película',
			data : docs
		}

		//res.render('edit-recipe', locals)
	})
}

RecipeController.save = (req, res, next) => {
	let recipe = {
		recipe_id : req.body.recipe_id,
		name : req.body.name,
		user_id : req.body.user_id,
		ingredients : req.body.ingredients,
        procedure : req.body.procedure,
        photos : req.body.photos,
        created_at : req.body.created_at
	}

	console.log(recipe)

	RecipeModel.save( recipe, () => res.redirect('/') )
}

RecipeController.delete = (req, res, next) => {
	let recipe_id = req.params.recipe_id
	console.log(recipe_id)

	RecipeModel.delete( recipe_id, () => res.redirect('/') )
}

RecipeController.addForm = (req, res, next) => res.render('add-recipe', { title : 'Agregar Receta' })

RecipeController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	//res.render('error', locals)

	next()
}

module.exports = RecipeController