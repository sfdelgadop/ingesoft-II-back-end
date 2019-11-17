'use strict'

var conn = require('./comments-connect'),
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
	console.log("holaaaa");
	
	conn
		.count({dishId : data.dishId})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)
			console.log(data.comment_id)
			if(count != -1)
			{
				conn.create(data, (err) => {
					if(err) throw err
					cb()
				})
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