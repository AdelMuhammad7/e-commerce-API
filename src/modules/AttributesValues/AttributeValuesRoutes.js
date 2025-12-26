import express from "express";
import { createAttributeValues, deleteAttributeValue, getAttributeValue, getAttributeValues, updateAttributeValue } from "./AttributeValuesController.js";
import { createAttributeValuesValidator, deleteAttributeValueValidator, getAttributeValueValidator, updateAttributeValueValidator } from "./AttributeValuesValidation.js";

export const router = express.Router();


router.route("/")
    .get(getAttributeValues)
    .post(createAttributeValuesValidator() , createAttributeValues)


router.route("/:id")
    .get(getAttributeValueValidator() ,getAttributeValue)
    .delete(deleteAttributeValueValidator() , deleteAttributeValue)
    .put(updateAttributeValueValidator() ,updateAttributeValue)