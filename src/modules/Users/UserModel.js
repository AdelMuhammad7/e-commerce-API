import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name : {
        type: String ,
        required : [true , "user name is required"],
        minLength: [2 , "too short length of user name"],
        trim: true
    },
    email : {
        type : String ,
        required : [true , "user email is required"],
        unique : [true , "user email must be unique"],
        lowercase : true
    },
    password : {
        type : String,
        required : [true , "user password is required"],
        minLength: [6 , "too short length of user password"],
    },
    passwordChangedAt : Date,
    passwordResetCode : String ,
    passwordResetExpires : Date ,
    passwordResetVerified : Boolean ,
    phone: Number ,
    profileImage: String,

    role: {
        type : String,
        enum : ["user" , "manager" , "admin"],
        default : "user"
    },

    status : {
        type : Boolean,
        default : true
    }

}, {timestamps: true })

// middelware from mongoose to retuen urlIMAGE
userSchema.post('init', function(doc) {
  if(doc.profileImage){
    const imageURL = `${process.env.BASE_URL}/${doc.profileImage}`;

    doc.profileImage = imageURL
  } 
});

userSchema.post('save', function(doc) {
  if(doc.profileImage){
    const imageURL = `${process.env.BASE_URL}/${doc.profileImage}`;

    doc.profileImage = imageURL
  } 
});

// middelware from mongoose to hash password
userSchema.pre('save' , async function(next) {

  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password , 12);
  next()
})



export const UserModel = mongoose.model("User" , userSchema)