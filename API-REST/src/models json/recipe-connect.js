'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

    RecipeSchema = new Schema({
        recipe_id: Number,
        name: String,
        user_id: Number,
        ingredients: {type: Schema.ObjectId, ref: "Ingredient"},
        procedure: {}

    },
    {    collection : "recipe"
    }),
    
    RecipeModel = mongoose.model("Recipe", RecipeSchema)
   
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    module.exports = RecipeModel
   