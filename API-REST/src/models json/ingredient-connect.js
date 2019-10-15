'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,
    
    IngredientSchema = new Schema({
        ingredient_id: Number,
        name:String,
        classification: String,
        region_id: {type: Schema.ObjectId, ref: "Region"},
        priority: Number
    },
    {
        collection : "ingredient"
    }),

    
    
    
    IngredientModel = mongoose.model("Ingredient", IngredientSchema)
    
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = IngredientModel
   