import express from "express";
import { changeUserPassword, createUser, deleteUser, getMe, getUser, getUsers, resizeImage, updateMe, updateMyPassword, updateUser, uploadUserImage } from "./UserController.js";
import { changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateMeValidator, updateUserValidator } from "./userValidation.js";
import { allowedTo, protectRoute } from "../AuthServices/authController.js";


export const router = express.Router();

// these routes allowed to any user sign in
router.get("/getMe" , protectRoute , getMe , getUser)
router.put("/changeMyPassword" , protectRoute , updateMyPassword)
router.put("/updateMe" , protectRoute  , updateMeValidator() , updateMe)

// these routes allowed to admin
router.route("/")
    .get(protectRoute , allowedTo("admin") , getUsers)
    .post(protectRoute , allowedTo("admin") , uploadUserImage , resizeImage , createUserValidator() , createUser)

router.route("/:id")
    .get(protectRoute , allowedTo("admin") , getUserValidator() , getUser )
    .put(protectRoute , allowedTo("admin") , uploadUserImage , resizeImage , updateUserValidator() ,  updateUser )
    .delete(protectRoute , allowedTo("admin") , deleteUserValidator() , deleteUser)

router.put("/changePassword/:id" , changeUserPasswordValidator() , changeUserPassword)

