import { BrandModel } from "./BrandModel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";
import expressAsyncHandler from "express-async-handler";
import { uploadSingleImage } from "../../middleware/uploadImageMiddleware.js";

// upload single Image
export const uploadBrandImage = uploadSingleImage('image')

// resize img with sharp
export const resizeImage = expressAsyncHandler(async (req , res , next) => {

    const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(1280 , 980)
        .toFormat('jpeg')
        .jpeg({quality : 100})
        .toFile(`uploads/brands/${fileName}`);
    
    // save image in our db
    req.body.image = `brands/${fileName}`;
    
    next();
})

// @desc   ===> Get All brands
// @route  ===> Get  /api/v1/brands
// @access ===> Public
export const getBrands = getAll(BrandModel)


// @desc   ===> Create Brand
// @route  ===> POST  /api/v1/brands
// @access ===> Private => [admin , manager]
export const createBrand = createOne(BrandModel)


// @desc   ===> Delete Brand
// @route  ===> DELETE  /api/v1/brands/:id
// @access ===> Private => [admin]
export const deleteBrand = deleteOne(BrandModel)


// @desc   ===> get specifc Brand by id
// @route  ===> GET  /api/v1/brands/:id
// @access ===> public
export const getBrand = getOne(BrandModel)


// @desc   ===> update Brand by id
// @route  ===> PUT  /api/v1/brands/:id
// @access ===> Private => [admin , manager]
export const updateBrand = updateOne(BrandModel)