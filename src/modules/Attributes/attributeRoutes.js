import express from "express";
import { createAttribute, deleteAttribute, getAttribute, getAttributes, UpdateAttribute } from "./attributeController.js";
import { createAttributeValidator, deleteAttributeValidator, getAttributeValidator, updateAttributeValidator } from "./attributeValidation.js";


export const router = express.Router();

router.route("/")
    .get(getAttributes)
    .post(createAttributeValidator() , createAttribute )

router.route("/:id")
    .get(getAttributeValidator() ,  getAttribute)
    .put(updateAttributeValidator() , UpdateAttribute)
    .delete(deleteAttributeValidator() , deleteAttribute)