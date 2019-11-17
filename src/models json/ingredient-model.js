'use strict'


var conn = require('./ingredient-connect'),
	IngredientModel = () => {}
//Obtiene todos los ingredientes
    IngredientModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}
//Obtiene un  ingrediente
IngredientModel.getOne = (id, cb) => {
	conn
		.findOne({ingredient_id : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}
//Guarda un ingrediente
IngredientModel.save = (data, cb) => {
	//console.log(data)
	conn
		.count({ingredient_id : data.ingredient_id})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)

			if(count != -1)
			{
				conn.create(data, (err) => {
					if(err) throw err
					cb()
				})
			}
			/*else if(count == 1)
			{
				conn.findOneAndUpdate(
					{ingredient_id : data.ingredient_id},
					{
                    name : data.name,
                    classification : data.classification,
                    region : data.region,
                    priority : data.priority
						
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}*/
		})
}
//Elimina un ingrediente
IngredientModel.delete = (id, cb) => {
	conn.remove({ingredient_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = IngredientModel