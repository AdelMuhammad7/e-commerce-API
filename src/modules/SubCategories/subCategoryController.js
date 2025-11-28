import slugify from "slugify"

import expressAsyncHandler from "express-async-handler"
import { CategoryModel } from "../Categories/categoryModel.js";
import {SubCategoryModel} from "./subCategoryModel.js"
import { ApiError } from "../../middleware/globalErrorHandler.js";

// @desc   ===> Create SubCategory
// @route  ===> POST  /api/v1/subcategories
// @access ===> Private
export const createSubCategory = expressAsyncHandler(async (req, res) => {

    const { name, categoryId } = req.body;

    // 1) Get category by ID
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
        return res.status(400).json({ message: "Category not found" });
    }

    // 2) Create SubCategory with parent object
    const subCategory = await SubCategoryModel.create({
        name,
        slug: slugify(name),
        parentCategory: {
            id: categoryId,
            name: category.name   // ⭐ هنا بقى
        }
    });

    res.status(201).json({ data: subCategory });
});


// @desc   ===> Get All SubCategories
// @route  ===> Get  /api/v1/subcategories
// @access ===> Public
export const getSubcategories = expressAsyncHandler (async (req ,res) => {
    // paganition
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const subCategories = await SubCategoryModel.find().skip(skip).limit(limit)

    res.status(200).json({
        results: subCategories.length,
        page,
        data: subCategories,
        msg: "success"
    })
})


// @desc   ===> get specifc SubCategory by id
// @route  ===> GET  /api/v1/subcategories/:id
// @access ===> public
export const getSubCategory = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    
    const subCategory = await SubCategoryModel.findById(id)

    if(!subCategory){
        return next(ApiError(`not found category for this id ${id}` , 404))
    }

    res.status(200).json({
        data: subCategory,
        msg: "success"
    })
})


// @desc   ===> update subCategory by id
// @route  ===> PUT  /api/v1/subcategories/:id
// @access ===> Private
export const updateSubCategory = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    const updateData = {};

    // لو بعت name
    if (name) {
        updateData.name = name;
        updateData.slug = slugify(name);
    }

    // لو بعت categoryId (عايز يغيّر الأب)
    if (categoryId) {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return next(ApiError("Category not found", 400));
        }

        updateData.parentCategory = {
            id: categoryId,
            name: category.name
        };
    }

    // Update
    const subCategory = await SubCategoryModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
    );

    if (!subCategory) {
        return next(ApiError(`not found subCategory for this id ${id}`, 404));
    }

    res.status(200).json({
        data: subCategory,
        msg: "success"
    });

});



// @desc   ===> Delete subCategory
// @route  ===> DELETE  /api/v1/subcategories/:id
// @access ===> Private
export const deleteSubCategory = expressAsyncHandler ( async (req , res , next) => {
    const id = req.params.id

    const subCategory = await SubCategoryModel.findByIdAndDelete(id)

    if(!subCategory){
        return next(ApiError(`not found subcategory for this id ${id}` , 404))
    }

    res.status(200).json({
        msg: "subCategory deleted successfully"
    })
})