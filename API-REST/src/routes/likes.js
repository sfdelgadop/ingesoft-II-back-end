'use strict'

var LikesController = require('../controllers/likes-controller'),


	express = require('express'),
	router = express.Router()
    
router

    .get('/ver-likes', LikesController.getAll)
    .get('/agregar-likes', LikesController.addForm)
    .post('/crear-likes', LikesController.save)
    .get('/editar-likes/:like_id', LikesController.getOne)
    .put('/actualizar-likes/:like_id', LikesController.save)
    .delete('/eliminar-likes/:like_id', LikesController.delete)
    .use(LikesController.error404)

	
module.exports = router