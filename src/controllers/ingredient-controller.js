'use strict'

var search = require('./search_ingredient');

var IngredientModel = require('../models json/ingredient-model'),
	IngredientController = () => {}
//Llama la función que trae todos los comentarios y lo guaarda en un JSON
IngredientController.getAll = (req, res, next) => {
	IngredientModel.getAll((docs) => {
		let locals = {
            name : 'Lista de Ingredientes',
            data : docs   
		}

		res.send(locals)
	})
}
//Llama la función que una region y la guarda en un JSON

IngredientController.getOne = (req, res, next) => {
	let ingredient_id = req.params.ingredient_id
	//console.log(ingredient_id)

	IngredientModel.getOne(ingredient_id, (docs) => {
		let locals = {
			name : 'Editar Ingrediente',
			data : docs
		}

		res.send(locals)
	})
}
//Llama la función que guarda un comentario

IngredientController.save = (req, res, next) => {
	let ingredient = {
		ingredient_id : search.hashcode(req.body.name),
		name : req.body.name,
		classification : req.body.classification,
		region : req.body.region,
		priority : req.body.priority
	}

	console.log(ingredient)

	IngredientModel.save( ingredient, () => res.redirect('/ver-ingredient') )
}
//Llama la función que borra un ingediente
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