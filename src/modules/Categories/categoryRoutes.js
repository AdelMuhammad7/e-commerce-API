import express from "express";
import { categoryImageUpload, createCategory, deleteCategory, getCategories, getCategory, resizeImage, updateCategory } from "./categoryController.js";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "./categoryValidation.js";
import { router as subCategoryRoutes } from "../SubCategories/subCategoryRoutes.js";
import { allowedTo, protectRoute } from "../Users/AuthServices/authController.js";

export const router = express.Router();


router.route("/")
    .get(getCategories)
    .post(protectRoute , allowedTo("admin" , "manager") ,categoryImageUpload , resizeImage , createCategoryValidator() , createCategory)

router.route("/:id")
    .get( getCategoryValidator() ,  getCategory)
    .put(protectRoute , allowedTo("admin" , "manager") ,categoryImageUpload , resizeImage , updateCategoryValidator() , updateCategory)
    .delete(protectRoute , allowedTo("admin") ,deleteCategoryValidator() , deleteCategory)

router.use("/:categoryId/subcategories" , subCategoryRoutes)

