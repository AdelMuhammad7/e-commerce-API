import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./categoryController.js";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "./categoryValidation.js";
import { router as subCategoryRoutes } from "../SubCategories/subCategoryRoutes.js";

export const router = express.Router();


router.route("/")
    .get(getCategories)
    .post(createCategoryValidator() , createCategory)

router.route("/:id")
    .get( getCategoryValidator() ,  getCategory)
    .put( updateCategoryValidator() , updateCategory)
    .delete(deleteCategoryValidator() , deleteCategory)

router.use("/:categoryId/subcategories" , subCategoryRoutes)

