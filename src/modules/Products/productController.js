import expressAsyncHandler from "express-async-handler"
import { ProductModel } from "./ProductModel.js"
import { ApiError } from "../../middleware/globalErrorHandler.js"
import multer from "multer";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import { uploadMixOfImages } from "../../middleware/uploadImageMiddleware.js";



// upload images
export const uploadProductImage = uploadMixOfImages([
    {name: "image" , maxCount: 1},
    {name: "gallery" , maxCount: 10}
])

// resize img with sharp
export const resizeImage = expressAsyncHandler(async (req, res, next) => {

    // cover image
    if (req.files?.image) {
        const fileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

        await sharp(req.files.image[0].buffer)
            .resize(2000, 1330)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`uploads/products/${fileName}`);

        req.body.image = `products/${fileName}`;
    }

    // gallery images
    if (req.files?.gallery) {
        req.body.gallery = [];

        await Promise.all(
            req.files.gallery.map(async (img, index) => {
                const imgName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                await sharp(img.buffer)
                    .resize(2000, 1330)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/products/${imgName}`);

                req.body.gallery.push(`products/${imgName}`);
            })
        );
    }

    next();
});




// @desc   ===> Get All Products
// @route  ===> GET  /api/v1/products
// @access ===> Public
export const getProducts = getAll(ProductModel)
// export const getProducts = expressAsyncHandler(async (req, res) => {

//     // build query
//     const countDocuments = await ProductModel.countDocuments()

//     const apiFeatures = new ApiFeatures(
//         ProductModel.find().populate({
//             path: "category subCategory brand",
//             select: "name"
//         }),
//         req.query
//     )
//         .paginate(countDocuments)
//         .filter()
//         .search("Products")
//         .limitFields()
//         .sort()
    
//     // Execute query
//     const products = await apiFeatures.mongooseQuery
//     res.status(200).json({
//         results: products.length,
//         pagination: apiFeatures.paginationResult,
//         data: products,
//         msg: "success"
//     })
// })


// @desc   ===> get specifc Product by id
// @route  ===> GET  /api/v1/products/:id
// @access ===> public
export const getProduct = getOne(ProductModel)


// export const getProduct = getOne(ProductModel, [
//   { path: "category", select: "name" },
//   { path: "subCategory", select: "name" },
//   { path: "brand", select: "name" },
// ])



// @desc   ===> Delete Product
// @route  ===> DELETE  /api/v1/products/:id
// @access ===> Private => [admin]
export const deleteProduct = deleteOne(ProductModel)



// @desc   ===> Create Product
// @route  ===> POST  /api/v1/products
// @access ===> Private => [admin , manager]
export const createProduct = createOne(ProductModel)


// @desc   ===> update Product by id
// @route  ===> PUT  /api/v1/products/:id
// @access ===> Private => [admin , manager]
export const updateProduct = updateOne(ProductModel)