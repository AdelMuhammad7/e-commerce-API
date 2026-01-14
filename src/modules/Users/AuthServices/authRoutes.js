import express from "express";
import { forgotPassword, login, resetPassword, signup, verifyPassResetCode } from "./authController.js";
import { loginValidator, signupValidator } from "./authValidation.js";



export const router = express.Router();


router.route("/signup")
    .post( signupValidator() , signup)

router.route("/login")
    .post(loginValidator() , login)

router.route("/forgotPassword")
    .post( forgotPassword )

router.route("/verifyResetCode")
    .post( verifyPassResetCode )

router.route("/resetPassword")
    .put( resetPassword ) 