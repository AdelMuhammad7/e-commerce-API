import {SubCategoryModel} from "./subCategoryModel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import expressAsyncHandler from "express-async-handler";
import { uploadSingleImage } from "../../middleware/uploadImageMiddleware.js";

// upload image with multer and sharp using memory storage
export const subCategoryImageUpload = uploadSingleImage('image')

export const resizeImage = expressAsyncHandler(async (req , res , next) => {
    const fileName = `subCategory-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file) {

        await sharp(req.file.buffer)
            .resize(1280 , 980)
            .toFormat('jpeg')
            .jpeg({quality : 100})
            .toFile(`uploads/subCategories/${fileName}`)
    
        req.body.image = `subCategories/${fileName}`
    }

    next();
})

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