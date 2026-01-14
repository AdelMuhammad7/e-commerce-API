import { UserModel } from "../UserModel.js"
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";
import expressAsyncHandler from "express-async-handler";
import { uploadSingleImage } from "../../../middleware/uploadImageMiddleware.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../../utils/handlersFactory.js";
import { ApiError } from "../../../middleware/globalErrorHandler.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../../../utils/genetrateToken.js";


// upload single Image
export const uploadUserImage = uploadSingleImage('profileImage')

// resize img with sharp
export const resizeImage = expressAsyncHandler(async (req , res , next) => {

    const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file) {
        await sharp(req.file.buffer)
        .resize(600 , 600)
        .toFormat('jpeg')
        .jpeg({quality : 100})
        .toFile(`uploads/users/${fileName}`);
    
        // save image in our db
        req.body.profileImage = `users/${fileName}`;
    }
    
    next();
})

// @desc   ===> Get All users
// @route  ===> Get  /api/v1/users
// @access ===> Private => [admin]
export const getUsers = getAll(UserModel)


// @desc   ===> Create User
// @route  ===> POST  /api/v1/users
// @access ===> Private => [admin]
export const createUser = createOne(UserModel)


// @desc   ===> Delete user
// @route  ===> DELETE  /api/v1/users/:id
// @access ===> Private => [admin]
export const deleteUser = deleteOne(UserModel)


// @desc   ===> get specifc user by id
// @route  ===> GET  /api/v1/users/:id
// @access ===> Private => [admin]
export const getUser = getOne(UserModel)

// set user active or inactive can make it in updateUser
// @desc   ===> update user by id
// @route  ===> PUT  /api/v1/users/:id
// @access ===> Private => [admin]
export const updateUser = expressAsyncHandler( async (req , res , next) => {
    
    const document = await UserModel.findByIdAndUpdate(
        req.params.id ,  
        {
            name : req.body.name,
            email : req.body.email,
            profileImage : req.body.profileImage,
            role : req.body.role,
            status : req.body.status,
        }, 
        {new: true}
    )

    if(!document){
        return next(ApiError(`not found document for this id ${req.params.id}` , 404))
    }

    res.status(200).json({
        data: document,
        msg: "success"
    })
})


// @desc   ===> change user password by id
// @route  ===> PUT  /api/v1/users/changePassword/:id
// @access ===> Private => [admin]
export const changeUserPassword = expressAsyncHandler( async (req , res , next) => {
    
    const document = await UserModel.findByIdAndUpdate(
        req.params.id ,  
        {
            password : await bcrypt.hash(req.body.password , 12),
            passwordChangedAt : Date.now()
        }, 
        {new: true}
    )

    if(!document){
        return next(ApiError(`not found document for this id ${req.params.id}` , 404))
    }

    res.status(200).json({
        data: document,
        msg: "success"
    })
})


// @desc   ===> get me
// @route  ===> GET  /api/v1/users/getMe
// @access ===> Private => [Protect for any one sign in]
export const getMe = (req, res, next) => {
    // 1) this route start from protect
    // 2) protect route check TOKEN and return USER in req.user
    // 3) here i assign req.user.id to >> req.params.id
    // 4) this to make function >> get user 
    // 5) so i use next to >>> next middelware get user
  req.params.id = req.user._id.toString()
  next()
}


// @desc   ===> update logged password
// @route  ===> PUT  /api/v1/users/changeMyPassword
// @access ===> Private => [Protect for any one sign in]
export const updateMyPassword = expressAsyncHandler(async (req , res , next)=> {
    // 1) update user password based on user payload >> (req.user._id)
    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            password : await bcrypt.hash(req.body.newPassword , 12),
            passwordChangedAt : Date.now()
        }, 
        {new: true}
    )

    // 2) generate token
    const token = generateToken(user._id)

    res.status(200).json({
        status: "Success",
        data : user ,
        token
    })
})


// @desc   ===> update logged user data without >> [password - role]
// @route  ===> PUT  /api/v1/users/updateMe
// @access ===> Private => [Protect for any one sign in]
export const updateMe = expressAsyncHandler(async (req , res , next)=> {
    const updatedUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone
        },
        {new : true}
    )

    res.status(200).json({
        status: "Success",
        data: updatedUser
    })
})