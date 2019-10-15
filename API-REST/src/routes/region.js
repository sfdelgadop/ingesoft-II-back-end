'use strict'

var RegionController = require('../controllers/region-controller')

	express = require('express'),
	router = express.Router()
    
router
 
    .get('/ver-region', RegionController.getAll)
    .get('/agregar-region', RegionController.addForm)
    .post('/', RegionController.save)
    .get('/editar-region/:region_id', RegionController.getOne)
    .put('/actualizar-region/:region_id', RegionController.save)
    .delete('/eliminar-region/:region_id', RegionController.delete)
    .use(RegionController.error404)


	
module.exports = router