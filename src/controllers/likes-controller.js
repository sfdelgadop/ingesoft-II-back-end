'use strict'

var LikesModel = require('../models json/likes-model'),
	LikesController = () => {}
//Llama la función que trae todos los comentarios
LikesController.getAll = (req, res, next) => {
	LikesModel.getAll((docs) => {
		let locals = {
			title : 'Lista de Likes',
			data : docs
		}

		res.send( locals)
	})
}
//Llama la función que una region y la guarda en un JSON

LikesController.getOne = (req, res, next) => {
	let likes_id = req.params.likes_id
	console.log(likes_id)

	LikesModel.getOne(likes_id, (docs) => {
		let locals = {
			title : 'Editar Like',
			data : docs
		}

		res.send(locals)
	})
}

LikesController.save = (req, res, next) => {
	let like = {
		likes_id : req.body.likes_id,
		recipe_id : req.body.recipe_id,
		user_id : req.body.user_id
	}

	console.log(like)

	LikesModel.save( like, () => res.redirect('/ver-likes') )
}

LikesController.delete = (req, res, next) => {
	let likes_id = req.params.likes_id
	console.log(likes_id)

	LikesModel.delete( likes_id, () => res.redirect('/') )
}

LikesController.addForm = (req, res, next) => res.render('add-Likes', { title : 'Agregar Like' })

LikesController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.send(locals)

	next()
}

module.exports = LikesController