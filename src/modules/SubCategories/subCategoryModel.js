import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true , "subCategory name required"],
        unique: [true , "name of subcategory must be unique"],
        minLength: [2 , "too short length of subCategory name"],
        maxLength: [32 , "too much length of subCategory name"],
        trim: true
    },

    slug: {
        type: String,
        lowercase: true
    },

    image: String,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "subCategory must belong to category"]
    }

}, { timestamps: true });

export const SubCategoryModel = mongoose.model("SubCategory" , subCategorySchema)
