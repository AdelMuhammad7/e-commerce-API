import express from "express";
import { categoryImageUpload, createCategory, deleteCategory, getCategories, getCategory, resizeImage, updateCategory } from "./categoryController.js";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "./categoryValidation.js";
import { router as subCategoryRoutes } from "../SubCategories/subCategoryRoutes.js";

export const router = express.Router();


router.route("/")
    .get(getCategories)
    .post(categoryImageUpload , resizeImage , createCategoryValidator() , createCategory)

router.route("/:id")
    .get( getCategoryValidator() ,  getCategory)
    .put(categoryImageUpload , resizeImage , updateCategoryValidator() , updateCategory)
    .delete(deleteCategoryValidator() , deleteCategory)

router.use("/:categoryId/subcategories" , subCategoryRoutes)

