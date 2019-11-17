'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,
    //Creamos el esquema de lo que debe tener un documento ingrediente en la colección ingredients
    IngredientSchema = new Schema({
        ingredient_id: Number,
        name:String,
        classification: String,
        region_id: String,
        priority: Number
    },
    {
        collection : "ingredient"
    }),

    
    
    
    IngredientModel = mongoose.model("Ingredient", IngredientSchema)
    
    //se realiza la conección con la base de datos
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = IngredientModel
   