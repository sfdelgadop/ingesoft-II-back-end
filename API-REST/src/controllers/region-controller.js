'use strict'

var RegionModel = require('../models json/region-model'),
	RegionController = () => {}

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

RegionController.save = (req, res) => {
	console.log(req.body);
	console.log(req.body.data);
	console.log(req.body.id_region);
	 var region = {
		
		id_region : req.body.id_region,
		name_region : req.body.name_region
		
	}
	
	console.log("controlador")
	console.log(region.name_region)
	console.log(region.id_region)
	RegionModel.save( region, () => res.redirect('/ver-region') )
}

RegionController.delete = (req, res, next) => {
	let id_region = req.params.id_region
	console.log(id_region)

	RegionModel.delete( id_region, () => res.redirect('/') )
}

RegionController.addForm = (req, res, next) => res.render('add-region', { title : 'Agregar Region' })

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