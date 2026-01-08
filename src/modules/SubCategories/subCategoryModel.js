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

// middelware from mongoose to retuen urlIMAGE
subCategorySchema.post('init', function(doc) {
  if(doc.image){
    const imageURL = `${process.env.BASE_URL}/${doc.image}`;

    doc.image = imageURL
  } 
});

subCategorySchema.post('save', function(doc) {
  if(doc.image){
    const imageURL = `${process.env.BASE_URL}/${doc.image}`;

    doc.image = imageURL
  } 
});

export const SubCategoryModel = mongoose.model("SubCategory" , subCategorySchema)
