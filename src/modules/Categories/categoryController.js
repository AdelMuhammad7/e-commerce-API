import {CategoryModel} from "./categoryModel.js"
import slugify from "slugify"
import expressAsyncHandler from "express-async-handler"
import { ApiError } from "../../middleware/globalErrorHandler.js"


// @desc   ===> Get All Categories
// @route  ===> Get  /api/v1/categories
// @access ===> Public
export const getCategories = expressAsyncHandler( async (req ,res) => {
    // paganition
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const categories = await CategoryModel.find({}).skip(skip).limit(limit)
    
    res.status(200).json({
        results: categories.length,
        page,
        data: categories,
        msg: "success"
    })
})



// @desc   ===> get specifc Category by id
// @route  ===> GET  /api/v1/categories/:id
// @access ===> public
export const getCategory = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    
    const category = await CategoryModel.findById(id)

    if(!category){
        return next(ApiError(`not found category for this id ${id}` , 404))
    }

    res.status(200).json({
        data: category,
        msg: "success"
    })
})


// @desc   ===> update Category by id
// @route  ===> PUT  /api/v1/categories/:id
// @access ===> Private
export const updateCategory = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    const name = req.body.name

    const category = await CategoryModel.findOneAndUpdate(
        {_id : id} ,  
        {
            name ,
            slug: slugify(name)
        } , 
        {new: true}
    )

    if(!category){
        return next(ApiError(`not found category for this id ${id}` , 404))
    }

    res.status(200).json({
        data: category,
        msg: "success"
    })

})


// @desc   ===> Delete Category
// @route  ===> DELETE  /api/v1/categories/:id
// @access ===> Private
export const deleteCategory = expressAsyncHandler ( async (req , res , next) => {
    const id = req.params.id

    const category = await CategoryModel.findByIdAndDelete(id)

    if(!category){
        return next(ApiError(`not found category for this id ${id}` , 404))
    }

    res.status(200).json({
        msg: "category deleted successfully"
    })
})


// @desc   ===> Create Category
// @route  ===> POST  /api/v1/categories
// @access ===> Private
export const createCategory = expressAsyncHandler( async (req ,res) => {
    const name = req.body.name;

    const category = await CategoryModel.create({name , slug: slugify(name )} );
    res.status(201).json({data: category});

})