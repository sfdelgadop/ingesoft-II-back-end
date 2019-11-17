'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

    //Creamos el esquema de lo que debe tener un documento comment en la colección comment
      CommentsSchema = new Schema({
        dishId: Number,
        rating : String,
        author: String,
        comment: String,
        date: Date,
    },
    {
        collection : "comments"
    }),
    CommentsModel = mongoose.model("Comments", CommentsSchema)
    
    //se realiza la conección con la base de datos
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = CommentsModel
