'use strict'

var SearchModel = require('../controllers/search_ingredient');

var conn = require('./recipe-connect'),
	RecipeModel = () => {}
    
RecipeModel.getAll = (cb) => {
    //console.log("hola")
	conn
		.find()
		.exec((err, docs) => {
			if(err) throw err
            cb(docs)
            console.log(docs)
		})
}


RecipeModel.getOne = (id, cb) => {
	conn
		.findOne({recipe_id : id})
		.exec((err, docs) => {
			if(err) throw err
            cb(docs)
            console.log(docs)
        })
}
RecipeModel.getPosibleRecipes = (ingredients,cb) => {
	let a = String(ingredients)
	a=a.split(",");
	//console.log(a);
	var b = SearchModel.getPosibilities(a);
	//console.log(b);
	var hashes= [];
	console.log(b.length-1);
	
	for(var i = 0, s = b.length-1; i < s; i++){
		/*if(i<s-1){
			hashes+= SearchModel.hashRecipe(b[i])+", ";
		}else{
			hashes+= SearchModel.hashRecipe(b[i]);
		}*/
		
		 var e = conn.find({ $or : [{id : SearchModel.hashRecipe(b[i]) }]}).exec((err, docs) => {
			if(err) throw err
			//cb(docs)
			if(docs.length==1){
			//console.log(docs[0]);
			hashes.push(docs[0]);
			}
		});
		console.log(hashes);
	}
	//hashes+="]"
	//hashes = String(hashes);
	console.log(hashes);
	
	conn
		.find({ $or: [{ id : {$in: [hashes.length-1]}}]})
		.exec((err, docs) => {
			if(err) throw err
			if(docs.length==1){
				//console.log(docs[0]);
				hashes.push(docs[0]);
				}
            cb(hashes)
            console.log(docs)
        })
}

RecipeModel.save = (data, cb) => {
	conn
		.count({id : data.id})
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
			}*/
		})
}

RecipeModel.delete = (id, cb) => {
	conn.remove({recipe_id : id}, (err, docs) => {
		if(err) throw err
		cb()
	})
}

module.exports = RecipeModel