'use strict'

var conn = require('./region-connect'),
	RegionModel = () => {}
//Trae todas las regiones
    RegionModel.getAll = (cb) => {
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}
//Trae una región
RegionModel.getOne = (id, cb) => {
	conn
		.findOne({id_region : id})
		.exec((err, docs) => {
			if(err) throw err
			cb(docs)
		})
}

function saveNotification1(data) {
    var notification = new Notification(data);
    notification.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}
// guarda una región
RegionModel.save = (data, cb) => {
	
	conn
			.count({id_region : data.id_region})
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)
			
			if(count == 0)
			{
				console.log(data.region_id);
				
				conn.create(data, (err) => {
					if(err){ throw err}
					cb()
					
				})
			}
			else if(count == 1)
			{
				conn.findOneAndUpdate(
					{region_id : data.region_id},
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
//Elimina una región
RegionModel.delete = (id, cb) => {
	conn.remove({id_region : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = RegionModel