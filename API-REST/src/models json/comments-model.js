'use strict'

var conn = require('./mongo-connect'),
	CommentsModel = () => {}

    CommentsModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

CommentsModel.getOne = (id, cb) => {
	conn
		.findOne({comment_id : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

CommentsModel.save = (data, cb) => {
	conn
		.count({comment_id : data.comment_id})
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
					{comment_id : data.comment_id},
					{
                        user_id : data.user_id,
                        recipe_id : data.recipe_id,
                        text : data.text,
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

CommentsModel.delete = (id, cb) => {
	conn.remove({comment_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = CommentsModel