'use strict'

var RegionModel = require('../models/region-model'),
	RegionController = () => {}

RegionController.getAll = (req, res, next) => {
	RegionModel.getAll((docs) => {
		let locals = {
			title : 'Lista de regiones',
			data : docs
		}

		res.render('index', locals)
	})
}

RegionController.getOne = (req, res, next) => {
	let region_id = req.params.region_id
	console.log(region_id)

	RegionModel.getOne(region_id, (docs) => {
		let locals = {
			title : 'Editar region',
			data : docs
		}

		res.render('edit-region', locals)
	})
}

RegionController.save = (req, res, next) => {
	let region = {
		region_id : req.body.region_id,
		name_region : req.body.name_region
	}

	console.log(region)

	RegionModel.save( region, () => res.redirect('/') )
}

RegionController.delete = (req, res, next) => {
	let region_id = req.params.region_id
	console.log(region_id)

	RegionModel.delete( region_id, () => res.redirect('/') )
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

	res.render('error', locals)

	next()
}

module.exports = RegionController