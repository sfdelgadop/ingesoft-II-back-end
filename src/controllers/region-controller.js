'use strict'

var RegionModel = require('../models json/region-model'),
	RegionController = () => {}
//Llama la función que trae todos los comentarios y lo guaarda en un JSON
RegionController.getAll = (req, res, next) => {
	RegionModel.getAll((docs) => {
		let locals = {
			title : 'Lista de regiones',
			data : docs
		}
		console.log("hola");
		
		res.send(locals)
	})
}
//Llama la función que una region y la guarda en un JSON
RegionController.getOne = (req, res, next) => {
	let id_region = req.params.id_region
	console.log(id_region)

	RegionModel.getOne(id_region, (docs) => {
		let locals = {
			title : 'Editar region',
			data : docs
		}

		res.send(locals)
	})
}
//Llama la función que guarda una región
RegionController.save = (req, res) => {
	
	 var region = {
		
		id_region : req.body.id_region,
		name_region : req.body.name_region
		
	}
	
	RegionModel.save( region, () => res.redirect('/ver-region') )
}
//Llama la función que elimina una región
RegionController.delete = (req, res, next) => {
	let id_region = req.params.id_region
	console.log(id_region)

	RegionModel.delete( id_region, () => res.redirect('/') )
}

RegionController.addForm = (req, res, next) => res.send('add-region', { title : 'Agregar Region' })

RegionController.error404 = (req, res, next) => {
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

module.exports = RegionController