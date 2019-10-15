'use strict'

var 
CommentsController = require('../controllers/comments-controller')

	express = require('express'),
	router = express.Router()
    
router
    

    .get('/ver-comments', CommentsController.getAll)
    .get('/agregar-comments', CommentsController.addForm)
    .post('/', CommentsController.save)
    .get('/editar-comments/:comment_id', CommentsController.getOne)
    .put('/actualizar-comments/:comment_id', CommentsController.save)
    .delete('/eliminar-comments/:comment_id', CommentsController.delete)
    .use(CommentsController.error404)

module.exports = router