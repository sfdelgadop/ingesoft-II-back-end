'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

  

    CommentsSchema = new Schema({
        comment_id : Number,
        recipe_id: {type: Schema.ObjectId, ref: "Recipe"},
        user_id: Number,
        text: String,
        created_at: Date,
    },
    {
        collection : "comments"
    })
    CommentsModel = mongoose.model("Comments", CommentsSchema)
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = CommentsModel
