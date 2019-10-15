'use strict'

var conn = require('./mongo-connect'),
	RecipeModel = () => {}

RecipeModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

RecipeModel.getOne = (id, cb) => {
	conn
		.findOne({recipe_id : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

RecipeModel.save = (data, cb) => {
	conn
		.count({recipe_id : data.recipe_id})
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
					{recipe_id : data.recipe_id},
					{
                        
                        name : data.name,
                        user_id : data.user_id,
                        ingredients : data.ingredients,
                        procedure : data.procedure,
                        photos : data.photos,
                        created_at : data.created_at
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
}

RecipeModel.delete = (id, cb) => {
	conn.remove({recipe_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = RecipeModel