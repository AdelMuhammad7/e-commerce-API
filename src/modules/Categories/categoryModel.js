import mongoose from "mongoose"

// >>>>>> 1- create schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true , "category name required"],
        unique : [true , "category must be unique"],
        minLength: [3 , "too short length of category name"],
        maxLength: [32 , "too much length of category name"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String,

} , {timestamps: true })

// >>>>> 2- create model >>> this model can do CRUD operations 
export const CategoryModel = mongoose.model('Category', categorySchema);
