'use strict'

var conn = require('./mongo-connect'),
	RegionModel = () => {}

    RegionModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

RegionModel.getOne = (id, cb) => {
	conn
		.findOne({id_region : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

RegionModel.save = (data, cb) => {
	conn
		.count({id_region : data.id_region})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)

			if(count == 0)
			{
				conn.create(data, (err) => {
					if(err) throw err
					cb()
				})
			}
			else if(count == 1)
			{
				conn.findOneAndUpdate(
					{id_region : data.id_region},
					{
						name_region : data.name_region,
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
}

RegionModel.delete = (id, cb) => {
	conn.remove({id_region : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = RegionModel