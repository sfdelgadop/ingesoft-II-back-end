'use strict'

var conn = require('./region-connect'),
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

function saveNotification1(data) {
    var notification = new Notification(data);
    notification.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}

RegionModel.save = (data, cb) => {
<<<<<<< HEAD
	//console.log(data);
	
	conn
		.count({region_id : data.region_id})
=======
	console.log(data);
	console.log(cb);
	console.log("model");
	console.log(data.id_region);
	conn
			.count({id_region : data.id_region})
>>>>>>> 5c756b77986cccdd451080fdafae387700c3175f
		.exec((err, count) => {
			if(err) throw err
			console.log(`Número de Docs: ${count}`)
			
<<<<<<< HEAD
			
=======
>>>>>>> 5c756b77986cccdd451080fdafae387700c3175f
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

RegionModel.delete = (id, cb) => {
	conn.remove({id_region : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = RegionModel