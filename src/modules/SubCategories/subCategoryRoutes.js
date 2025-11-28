import express from "express"
import { createSubCategory, deleteSubCategory, getSubcategories, getSubCategory, updateSubCategory } from "./subCategoryController.js"
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from "./subCategoryValidation.js"


export const router = express.Router()

router.route("/")
        .post(createSubCategoryValidator() , createSubCategory)
        .get(getSubcategories)

router.route("/:id")
        .get(getSubCategoryValidator() , getSubCategory)
        .put(updateSubCategoryValidator(), updateSubCategory) 
        .delete(deleteSubCategoryValidator() ,  deleteSubCategory)