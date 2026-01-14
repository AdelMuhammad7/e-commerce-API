import express from "express";
import { createAttribute, deleteAttribute, getAttribute, getAttributes, UpdateAttribute } from "./attributeController.js";
import { createAttributeValidator, deleteAttributeValidator, getAttributeValidator, updateAttributeValidator } from "./attributeValidation.js";
import { allowedTo, protectRoute } from "../Users/AuthServices/authController.js";


export const router = express.Router();

router.route("/")
    .get(getAttributes)
    .post(protectRoute , allowedTo("admin" , "manager") ,createAttributeValidator() , createAttribute )

router.route("/:id")
    .get(getAttributeValidator() ,  getAttribute)
    .put(protectRoute , allowedTo("admin" , "manager") ,updateAttributeValidator() , UpdateAttribute)
    .delete(protectRoute , allowedTo("admin") ,deleteAttributeValidator() , deleteAttribute)