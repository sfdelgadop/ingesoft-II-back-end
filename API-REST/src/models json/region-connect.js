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
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    
    module.exports = RegionModel