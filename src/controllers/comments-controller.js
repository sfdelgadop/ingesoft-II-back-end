'use strict'

var CommentsModel = require('../models json/comments-model'),
	CommentsController = () => {}
//Llama la función que trae todos los comentarios y lo guaarda en un JSON
CommentsController.getAll = (req, res, next) => {
	CommentsModel.getAll((docs) => {
		let locals = {
			text : 'Lista de Comentarios',
			data : docs
		}

		res.send(docs)
	})
}
//Llama la función que trae un comentario y lo guarda en un JSON

CommentsController.getOne = (req, res, next) => {
	let comment_id = req.params.comment_id
	console.log(comment_id)

	CommentsModel.getOne(comments_id, (docs) => {
		let locals = {
			title : 'Editar Película',
			data : docs
		}

		res.send(locals)
	})
}
//Llama la función que guarda un comentario 

CommentsController.save = (req, res, next) => {
	let comment = {
        dishId : req.body.dishId,
        rating : req.body.rating,
		author : req.body.author,
		comment : req.body.comment,
		date : req.body.date
	}

	console.log(comment)

	CommentsModel.save( comment, () => res.redirect('/ver-comments') )
}
//Llama la función que borra un comentario
CommentsController.delete = (req, res, next) => {
	let comment_id = req.params.comment_id
	console.log(comments_id)

	CommentsModel.delete( comment_id, () => res.redirect('/') )
}

CommentsController.addForm = (req, res, next) => res.render('add-comment', { text : 'Agregar Comentario' })

CommentsController.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			text : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.send(locals)

	next()
}

module.exports = CommentsController