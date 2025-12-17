import express from "express"
import { createSubCategory, deleteSubCategory, getSubcategories, getSubCategory, updateSubCategory } from "./subCategoryController.js"
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from "./subCategoryValidation.js"

// merge params >>> allow us to access parameters from other routes
// ex. we need to access categoryid from category route
export const router = express.Router({mergeParams: true})

router.route("/")
        .post(createSubCategoryValidator() , createSubCategory)
        .get(getSubcategories)

router.route("/:id")
        .get(getSubCategoryValidator() , getSubCategory)
        .put(updateSubCategoryValidator(), updateSubCategory) 
        .delete(deleteSubCategoryValidator() ,  deleteSubCategory)