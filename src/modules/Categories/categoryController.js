import {CategoryModel} from "./categoryModel.js"
import slugify from "slugify"
import expressAsyncHandler from "express-async-handler"


// @desc   ===> Get All Categories
// @route  ===> Get  /api/v1/categories
// @access ===> Public
export const getCategories = expressAsyncHandler( async (req ,res) => {
    const categories = await CategoryModel.find({})
    
    res.status(200).json({
        results: categories.length,
        data: categories,
        msg: "success"
    })
})


// @desc   ===> Create Category
// @route  ===> POST  /api/v1/categories
// @access ===> Private
export const createCategory = expressAsyncHandler( async (req ,res) => {
    const name = req.body.name

    const category = await CategoryModel.create({name , slug: slugify(name )} )
    res.status(201).json({data: category})

})