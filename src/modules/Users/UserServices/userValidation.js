import { body, check } from "express-validator";
import { validatorMiddleware } from "../../../middleware/validatorMiddleware.js";
import { UserModel } from "../UserModel.js";
import bcrypt from "bcryptjs"

export function createUserValidator () {
    return [
        check('name')
            .notEmpty().withMessage('user name required')
            .isLength({min : 3}).withMessage('too short length of user name')
            .isLength({max: 32}).withMessage("too much length of user name"),
        check('email')
            .notEmpty().withMessage('e-mail is required')
            .isEmail().withMessage('invalid e-mail')
            .custom((val)=> UserModel.findOne({email : val}).then((user)=> {
                if(user){
                    return Promise.reject(new Error('email is exists'))
                }
            })),
        check('profileImage')
            .optional(),
        check('role')
            .optional(),
        check('password')
            .notEmpty().withMessage('password is required')
            .isLength({min : 6}).withMessage('password must be at least 6')
            .custom((password , { req })=> {
                if(password !== req.body.passwordConfirm){
                    throw new Error('passwordConfirm is incorrect')
                }
                return true;
            }),
        check('passwordConfirm')
            .notEmpty().withMessage('passwordConfirm is required'),
        check('phone')
            .optional()
            .isMobilePhone(['ar-EG' , 'ar-SA']).withMessage("invalid phone number"),


        validatorMiddleware()
    ]
}

export function getUserValidator() {
  return [
    check("id")
      .notEmpty().withMessage("User id required")
      .isMongoId().withMessage("invalid User id format"),
      
    validatorMiddleware()
  ];
}

export function updateMeValidator() {
    return [
        check('name')
            .notEmpty().withMessage('user name required')
            .isLength({min : 3}).withMessage('too short length of user name')
            .isLength({max: 32}).withMessage("too much length of user name"),
        check('email')
            .notEmpty().withMessage('e-mail is required')
            .isEmail().withMessage('invalid e-mail')
            .custom((val)=> UserModel.findOne({email : val}).then((user)=> {
                if(user){
                    return Promise.reject(new Error('email is exists'))
                }
            })),
        check('phone')
            .optional()
            .isMobilePhone(['ar-EG' , 'ar-SA']).withMessage("invalid phone number"),  
            
        validatorMiddleware()
    ]
}


export function updateUserValidator () {
    return [
        check("id")
            .notEmpty().withMessage("User id required")
            .isMongoId().withMessage("invalid User id format"),

            
        validatorMiddleware()
    ]
}

export function deleteUserValidator () {
    return [
        check("id")
            .notEmpty().withMessage("User id required")
            .isMongoId().withMessage("invalid User id format"),
            
        validatorMiddleware()
    ]
}


export function changeUserPasswordValidator () {
    return [
        check("id")
            .notEmpty().withMessage("User id required")
            .isMongoId().withMessage("invalid User id format"),
        body('currentPassword')
            .notEmpty().withMessage("current password is required"),
        body('confirmPassword')
            .notEmpty().withMessage("current password is required"),
        body('password')
            .notEmpty().withMessage("current password is required")
            .custom(async (val , {req})=> {
                // 1) check current password is correct
                const user = await UserModel.findById(req.params.id)

                if(!user) {
                    throw new Error('there is no user for this id')
                }

                const isCorrectPassword = await bcrypt.compare(req.body.currentPassword , user.password)

                if(!isCorrectPassword) {
                    throw new Error('currentPassword is incorrect')
                }

                // 2) check confirm password === newPassword
                if(val !== req.body.confirmPassword){
                    throw new Error('confirm password is not match with new password')
                }

                return true
            }),


        validatorMiddleware()
    ]
}