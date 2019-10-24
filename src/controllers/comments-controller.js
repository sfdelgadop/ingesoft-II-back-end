'use strict'

var CommentsModel = require('../models json/comments-model'),
	CommentsController = () => {}

CommentsController.getAll = (req, res, next) => {
	CommentsModel.getAll((docs) => {
		let locals = {
			text : 'Lista de Comentarios',
			data : docs
		}

		res.send(docs)
	})
}

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