import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../UserModel.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../../../middleware/globalErrorHandler.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { sendEmail } from "../../../utils/sendEmail.js";
import { generateToken } from "../../../utils/genetrateToken.js";




// @desc   ===> sign up
// @route  ===> Post  /api/v1/auth/signup
// @access ===> Public
export const signup = expressAsyncHandler(async (req , res , next)=> {
    // 1) create user
    const user = await UserModel.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    });

    // 2) generate token
    const token = generateToken(user._id)

    // 3) send response
    res.status(201).json(
        {   
            data: user ,
            token ,
            msg: "created successfully..."
        }
    );
})


// @desc   ===> log in
// @route  ===> Post  /api/v1/auth/login
// @access ===> Public
export const login = expressAsyncHandler(async (req , res , next)=> {
    // 1) check if email , password in the body (Validation)
    // 2) check if email is exits & check if password is correct
    const user = await UserModel.findOne({email : req.body.email})

    if(!user || !(await bcrypt.compare(req.body.password , user.password))){
        return next(new ApiError('email or password is incorrect'))
    }
    // 3) generate token
    const token = generateToken(user._id)

    // 4) send response 
    res.status(201).json(
        {   
            data: user ,
            token , 
            msg: "login successfully..."
        }
    );
})



// @desc   ===> protect routes with token
export const protectRoute = expressAsyncHandler (async (req , res , next) => {
    // 1) check if token exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return next(new ApiError("You are not logged in, please login first", 401));
    }
    
    // 2) verify token (no changes happen or expired token)
    // >>>>>>>>>>>>>> remeber to change error in production mode
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
    // decoded = { userId, iat, exp }   


    // 3) check if user still exists
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
        return next(
            new ApiError("The user that belongs to this token no longer exists", 401)
        );
    }

    // 4) check if user changed password after token was created
    if (user.passwordChangedAt) {
        const passwordChangedTimestamp =
            parseInt(user.passwordChangedAt.getTime() / 1000, 10);

            // password changed after token created
        if (passwordChangedTimestamp > decoded.iat) {
            return next(
                new ApiError("User recently changed password, please login again", 401)
            );
        }
    }

    // 5) attach user to request
    req.user = user;
    next();
})


// @desc   ===> allowed permision for routes (Authouration)
export const allowedTo = (...roles) => 
    expressAsyncHandler (async (req , res , next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)
        if(!roles.includes(req.user.role)){
            return next(
                new ApiError('You are not allowed to access this route' , 403)
            ) 
        };

        next();
})


// @desc   ===> forgot Password
// @route  ===> Post  /api/v1/auth/forgotPassword
// @access ===> Public
export const forgotPassword = expressAsyncHandler(async (req , res , next)=> {
    // 1) find user by email
    const user = await UserModel.findOne({email : req.body.email})
    if(!user) {
        return next(
            new ApiError(`not found user for this email ${req.body.email}`)
        )
    }

    // 2) if user exist , generate code (6 digits) and save it in DB
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(resetCode)
        .digest('hex');

        // save hash into database
        user.passwordResetCode = hashedResetCode
        // expire this code after 10 min
        user.passwordResetExpires = Date.now() + (10 * 60 * 1000)
        user.passwordResetVerified = false

    await user.save()

    // 3) Send reset code via Email
    const message = `Hi ${user.name}, \n We recieved a requset to reset password on your app \n ${resetCode}`
   
    try {
        await sendEmail({
            email : user.email,
            subject : `Your password reset code (valid for 10 min)`,
            message,
        })
    }catch (err) {
        user.passwordResetCode = null;
        user.passwordResetExpires = null;
        user.passwordResetVerified = null;
        await user.save()
        return next(new ApiError('There is an Error in sending email' , 500))
    }

    res.status(200).json({
        status: "Success",
        message: "Reset code sent to your email and valid for 10 min"
    })
})


// @desc   ===> verify ResetCode
// @route  ===> Post  /api/v1/auth/verifyResetCode
// @access ===> Public
export const verifyPassResetCode = expressAsyncHandler (async (req , res , next)=> {
    // 1) get user by Reset code
    const hashedResetCode = crypto
        .createHash('sha256')
        .update(req.body.resetCode)
        .digest('hex');
    
    const user = await UserModel.findOne({
        passwordResetCode : hashedResetCode ,
        passwordResetExpires : {$gt: Date.now()}
    })
    if(!user){
        return next(
            new ApiError('Reset code is Invaild or Expired')
        )
    }

    // 2) Reset code vaild
    user.passwordResetVerified = true
    await user.save();

    res.status(200).json({
        status : "Success"
    })
})


// @desc   ===> reset password
// @route  ===> Put  /api/v1/auth/resetPassword
// @access ===> Public
export const resetPassword = expressAsyncHandler(async (req , res ,next)=> {
    // 1) get user by Email 
    const user = await UserModel.findOne({email : req.body.email})
    if(!user) {
        return next(
            new ApiError(`There is no user for this Email >> ${req.body.email}` , 404)
        )
    }

    // 2) check if >> passwordResetVerified is true or not
    if(!user.passwordResetVerified) {
        return next(
            new ApiError(`Reset code not verified` , 400)
        )
    }

    // 3) if true >>>
    user.password = req.body.newPassword

    // 4) make these values with null and save to DB
    user.passwordResetCode = null;
    user.passwordResetExpires = null;
    user.passwordResetVerified = null;

    await user.save()

    // 5) generate token
    const token = generateToken(user._id)

    // 6) send response
    res.status(200).json({
        status : "Success",
        message : "Password is Changed successfully... ",
        token
    })
})