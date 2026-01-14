import { check } from "express-validator";
import { validatorMiddleware } from "../../../middleware/validatorMiddleware.js";
import { UserModel } from "../UserModel.js";


export function signupValidator () {
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


export function loginValidator () {
    return [
        check('email')
            .notEmpty().withMessage('e-mail is required')
            .isEmail().withMessage('invalid e-mail'),
        check('password')
            .notEmpty().withMessage('password is required')
            .isLength({min : 6}).withMessage('password must be at least 6'),

        validatorMiddleware()
    ]
}