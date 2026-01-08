import express from "express"
import { createSubCategory, deleteSubCategory, getSubcategories, getSubCategory, resizeImage, subCategoryImageUpload, updateSubCategory } from "./subCategoryController.js"
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from "./subCategoryValidation.js"

// merge params >>> allow us to access parameters from other routes
// ex. we need to access categoryid from category route
export const router = express.Router({mergeParams: true})

router.route("/")
        .post(subCategoryImageUpload , resizeImage , createSubCategoryValidator() , createSubCategory)
        .get(getSubcategories)

router.route("/:id")
        .get(getSubCategoryValidator() , getSubCategory)
        .put(subCategoryImageUpload , resizeImage , updateSubCategoryValidator(), updateSubCategory) 
        .delete(deleteSubCategoryValidator() ,  deleteSubCategory)