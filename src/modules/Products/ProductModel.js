import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true , 
        required : [true , "product title is required"] ,
        minLength : [3 , "too short product title"] ,
        unique : true
    },
    description : {
        type : String,
        trim : true ,
        required : [true , "product description is required"]
    },
    image : {
        type : String,
        required : [true , "product image is required"]
    },
    gallery : [String] ,
    price : {
        type : Number,
        trim : true ,
        required : [true , "product price is required"] ,
    },
    priceAfterDiscount : {
        type: Number,
        trim : true,
    },
    stock : {
        type : Number,
        trim : true,
        required : [true , "product stock is required"]
    },
    sold : {
        type : Number,
        default : 0
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref: "Category",
        required : [true , "product category is required"]
    },
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref: "SubCategory"
        }
    ],
    brand : {
        type : mongoose.Schema.ObjectId,
        ref: "Brand"
    },
    ratingAverage : {
        type : Number,
        // required : [true , "product ratingAverage is required"],
        min : [1 , "rate is should be 1 or more"],
        max : [5 , "rate is should be 5 or less"]
    },
    ratingQuantity : {
        type: Number,
        default: 0
    }

} , {timestamps: true })

// mongoose query this happen after any query (find - findbyid , ....) this to make populate to return name not only id
ProductSchema.pre(/^find/, function (next) {
  this.populate({ path: "category subCategory brand", select: "name" })
  next()
})

const setImageUrl = (doc) => {

    if (doc.image) {
        doc.image = `${process.env.BASE_URL}/${doc.image}`;
    }

    if (doc.gallery && Array.isArray(doc.gallery)) {
        doc.gallery = doc.gallery.map((el) => {
            return `${process.env.BASE_URL}/${el}`;
        });
    }
};

ProductSchema.post("init", (doc) => {
    setImageUrl(doc);
});

ProductSchema.post("save", (doc) => {
    setImageUrl(doc);
});


export const ProductModel = mongoose.model("Product" , ProductSchema)