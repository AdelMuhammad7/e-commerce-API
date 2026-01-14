import express from "express";
import { createAttributeValues, deleteAttributeValue, getAttributeValue, getAttributeValues, updateAttributeValue } from "./AttributeValuesController.js";
import { createAttributeValuesValidator, deleteAttributeValueValidator, getAttributeValueValidator, updateAttributeValueValidator } from "./AttributeValuesValidation.js";
import { allowedTo, protectRoute } from "../Users/AuthServices/authController.js";

export const router = express.Router();


router.route("/")
    .get(getAttributeValues)
    .post(protectRoute , allowedTo("admin" , "manager") ,createAttributeValuesValidator() , createAttributeValues)


router.route("/:id")
    .get(getAttributeValueValidator() ,getAttributeValue)
    .delete(protectRoute , allowedTo("admin" , "manager") ,deleteAttributeValueValidator() , deleteAttributeValue)
    .put(protectRoute , allowedTo("admin") ,updateAttributeValueValidator() ,updateAttributeValue)