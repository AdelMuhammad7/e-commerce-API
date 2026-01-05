import {SubCategoryModel} from "./subCategoryModel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js";

// @desc   ===> Create SubCategory
// @route  ===> POST  /api/v1/subcategories
// @access ===> Private
export const createSubCategory = createOne(SubCategoryModel)

// @desc   ===> Get SubCategories for category id
// @route  ===> Get "/api/v1/categories/:categoryId/subcategories"

// @desc   ===> Get All SubCategories 
// @route  ===> Get  /api/v1/subcategories
// @access ===> Public
export const getSubcategories = getAll(SubCategoryModel)


// @desc   ===> get specifc SubCategory by id
// @route  ===> GET  /api/v1/subcategories/:id
// @access ===> public
export const getSubCategory = getOne(SubCategoryModel)



// @desc   ===> update subCategory by id
// @route  ===> PUT  /api/v1/subcategories/:id
// @access ===> Private
export const updateSubCategory = updateOne(SubCategoryModel)



// @desc   ===> Delete subCategory
// @route  ===> DELETE  /api/v1/subcategories/:id
// @access ===> Private
export const deleteSubCategory = deleteOne(SubCategoryModel)