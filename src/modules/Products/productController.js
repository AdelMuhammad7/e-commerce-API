import expressAsyncHandler from "express-async-handler"
import { ProductModel } from "./ProductModel.js"
import { ApiError } from "../../middleware/globalErrorHandler.js"
import qs from "qs"
import ApiFeatures from "../../utils/apiFeatures.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"



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
// @access ===> Private
export const deleteProduct = deleteOne(ProductModel)



// @desc   ===> Create Product
// @route  ===> POST  /api/v1/products
// @access ===> Private
export const createProduct = createOne(ProductModel)


// @desc   ===> update Product by id
// @route  ===> PUT  /api/v1/products/:id
// @access ===> Private
export const updateProduct = updateOne(ProductModel)