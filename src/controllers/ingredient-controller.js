'use strict'

var IngredientModel = require('../models json/ingredient-model'),
	IngredientController = () => {}

IngredientController.getAll = (req, res, next) => {
	IngredientModel.getAll((docs) => {
		let locals = {
            name : 'Lista de Ingredientes',
            data : docs   
		}

		res.send(locals)
	})
}

IngredientController.getOne = (req, res, next) => {
	let ingredient_id = req.params.ingredient_id
	console.log(ingredient_id)

	IngredientModel.getOne(ingredient_id, (docs) => {
		let locals = {
			name : 'Editar Ingrediente',
			data : docs
		}

		res.send(locals)
	})
}

IngredientController.save = (req, res, next) => {
	let ingredient = {
		ingredient_id : req.body.ingredient_id,
		name : req.body.name,
		classification : req.body.classification,
		region : req.body.region,
		priority : req.body.priority
	}

	console.log(ingredient)

	IngredientModel.save( ingredient, () => res.redirect('/ver-ingredient') )
}

IngredientController.delete = (req, res, next) => {
	let ingredient_id = req.params.ingredient_id
	console.log(ingredient_id)

	IngredientModel.delete( ingredient_id, () => res.redirect('/') )
}

IngredientController.addForm = (req, res, next) => res.render('add-ingredient', { namer : 'Agregar Ingrediente' })

IngredientController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			nombre : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.send(locals)

	next()
}

module.exports = IngredientController