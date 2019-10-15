'use strict'

var CommentsModel = require('../models/comments-model'),
	CommentsController = () => {}

CommentsController.getAll = (req, res, next) => {
	CommentsModel.getAll((docs) => {
		let locals = {
			text : 'Lista de Comentarios',
			data : docs
		}

		res.render('index', locals)
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

		res.render('edit-comments', locals)
	})
}

CommentsController.save = (req, res, next) => {
	let comment = {
		comment_id : req.body.comment_id,
		user_id : req.body.user_id,
		text : req.body.text,
		created_at : req.body.created_at
	}

	console.log(comment)

	CommentsModel.save( comment, () => res.redirect('/') )
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

	res.render('error', locals)

	next()
}

module.exports = CommentsController