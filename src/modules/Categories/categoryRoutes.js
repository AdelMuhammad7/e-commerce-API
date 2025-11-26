import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./categoryController.js";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "./categoryValidation.js";



export const router = express.Router();

router.route("/")
            .get(getCategories)
            .post(createCategoryValidator() , createCategory)

router
    .route("/:id")
        .get( getCategoryValidator() ,  getCategory)
        .put( updateCategoryValidator() , updateCategory)
        .delete(deleteCategoryValidator() , deleteCategory)


