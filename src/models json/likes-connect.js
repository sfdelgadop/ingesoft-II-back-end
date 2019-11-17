'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

    

    LikesSchema = new Schema({
        recipe_id : {type: Schema.ObjectId, ref: "Recipe"},
        user_id: Number,
    },
    {
        collection : "likes"
    }),


    LikesModel = mongoose.model("Likes", LikesSchema)
    
    //se realiza la conección con la base de datos

    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)


    module.exports = LikesModel