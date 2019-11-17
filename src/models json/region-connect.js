'use strict'

var mongoose = require('mongoose'),
    conf = require('./db-conf'),
    Schema = mongoose.Schema,

    RegionSchema = new Schema({
        "id_region" : {
            type: Number
        },
        "name_region" : {
            type: String 
        }
    },
    {
        collection : "region"
    }),
    
  
    RegionModel = mongoose.model("Region", RegionSchema)
    
        //se realiza la conección con la base de datos
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = RegionModel