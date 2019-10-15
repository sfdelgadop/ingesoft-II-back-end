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

    CommentsSchema = new Schema({
        comment_id : Number,
        recipe_id: {type: Schema.ObjectId, ref: "Recipe"},
        user_id: Number,
        text: String,
        created_at: Date,
    },
    {
        collection : "comments"
    }),

    LikesSchema = new Schema({
        recipe_id : {type: Schema.ObjectId, ref: "Recipe"},
        user_id: Number,
    },
    {
        collection : "likes"
    }),

    RegionSchema = new Schema({
        id_region : Number,
        name_region : String 
    },
    {
        collection : "region"
    }),
    
    RecipeModel = mongoose.model("Recipe", RecipeSchema),
    IngredientModel = mongoose.model("Ingredient", IngredientSchema),
    CommentsModel = mongoose.model("Comments", CommentsSchema),
    LikesModel = mongoose.model("Likes", LikesSchema),
    RegionModel = mongoose.model("Region", RegionSchema)
    
    mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`)

    module.exports = RecipeModel
    /*module.exports = IngredientModel
    module.exports = CommentsModel
    module.exports = LikesModel
    module.exports = RegionModel*/