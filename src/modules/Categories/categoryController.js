import {CategoryModel} from "./categoryModel.js"
import slugify from "slugify"
import expressAsyncHandler from "express-async-handler"
import { ApiError } from "../../middleware/globalErrorHandler.js"
import { SubCategoryModel } from "../SubCategories/subCategoryModel.js"
import ApiFeatures from "../../utils/apiFeatures.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"


// @desc   ===> Get All Categories
// @route  ===> Get  /api/v1/categories
// @access ===> Public
export const getCategories = getAll(CategoryModel)


// @desc   ===> get specifc Category by id
// @route  ===> GET  /api/v1/categories/:id
// @access ===> public
export const getCategory = getOne(CategoryModel)

// @desc   ===> update Category by id
// @route  ===> PUT  /api/v1/categories/:id
// @access ===> Private
export const updateCategory = updateOne(CategoryModel)


// @desc   ===> Delete Category
// @route  ===> DELETE  /api/v1/categories/:id
// @access ===> Private
export const deleteCategory = deleteOne(CategoryModel)


// @desc   ===> Create Category
// @route  ===> POST  /api/v1/categories
// @access ===> Private
export const createCategory = createOne(CategoryModel)