'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

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
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = CommentsModel
