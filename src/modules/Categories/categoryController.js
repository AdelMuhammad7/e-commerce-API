import {CategoryModel} from "./categoryModel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"
import expressAsyncHandler from "express-async-handler"
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp"
import { uploadSingleImage } from "../../middleware/uploadImageMiddleware.js"

// upload image with multer and sharp using memory storage
export const categoryImageUpload = uploadSingleImage('image')

export const resizeImage = expressAsyncHandler(async (req , res , next) => {
    const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(1280 , 980)
        .toFormat('jpeg')
        .jpeg({quality : 100})
        .toFile(`uploads/categories/${fileName}`)

    req.body.image = `categories/${fileName}`


    next();
})

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