import mongoose from "mongoose"

// >>>>>> 1- create schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true , "brand name required"],
        unique : [true , "brand must be unique"],
        minLength: [3 , "too short length of brand name"],
        maxLength: [32 , "too much length of brand name"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String,

} , {timestamps: true })


// middelware from mongoose to retuen urlIMAGE
brandSchema.post('init', function(doc) {
  if(doc.image){
    const imageURL = `${process.env.BASE_URL}/${doc.image}`;

    doc.image = imageURL
  } 
});

brandSchema.post('save', function(doc) {
  if(doc.image){
    const imageURL = `${process.env.BASE_URL}/${doc.image}`;

    doc.image = imageURL
  } 
});

// >>>>> 2- create model >>> this model can do CRUD operations 
export const BrandModel = mongoose.model('Brand', brandSchema);
