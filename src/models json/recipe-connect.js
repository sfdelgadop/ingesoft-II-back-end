'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

    RecipeSchema = new Schema({
        id: Number,
        name: String,
        user_id: Number,
        image: String,
        ingredients: {},
        procedure: {},
        created_at: Date

    },
    {    collection : "recipe"
    }),
    
    RecipeModel = mongoose.model("Recipe", RecipeSchema)
   
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    module.exports = RecipeModel
   