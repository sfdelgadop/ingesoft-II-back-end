'use strict'

var conn = require('./mongo-connect'),
	IngredientModel = () => {}

    IngredientModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

IngredientModel.getOne = (id, cb) => {
	conn
		.findOne({ingredient_id : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

IngredientModel.save = (data, cb) => {
	conn
		.count({ingredient_id : data.ingredient_id})
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
					{ingredient_id : data.ingredient_id},
					{
                    name : data.name,
                    clasification : data.clasification,
                    region : data.region,
                    prioridad : data.prioridad
						
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
}

IngredientModel.delete = (id, cb) => {
	conn.remove({ingredient_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = IngredientModel