'use strict'

var conn = require('./likes-connect'),
	LikesModel = () => {}

    LikesModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

LikesModel.getOne = (id, cb) => {
	conn
		.findOne({like_id : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

LikesModel.save = (data, cb) => {
	conn
		.count({like_id : data.like_id})
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
					{like_id : data.like_id},
					{
						recipe_id : data.recipe_id,
                         user_id : data.user_id
					},
					(err) => {
						if(err) throw(err)
						cb()
					}
				)
			}
		})
}

LikesModel.delete = (id, cb) => {
	conn.remove({like_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = LikesModel