import expressAsyncHandler from "express-async-handler"
import { ProductModel } from "./ProductModel.js"
import { ApiError } from "../../middleware/globalErrorHandler.js"



// @desc   ===> Get All Products
// @route  ===> Get  /api/v1/products
// @access ===> Public
export const getProducts = expressAsyncHandler( async (req ,res) => {
    // paganition
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const products = await ProductModel.find()
                    .skip(skip)
                    .limit(limit)
                    .populate({path: "category subCategory brand" , select :'name'})
    
    res.status(200).json({
        results: products.length,
        page,
        data: products,
        msg: "success"
    })
})


// @desc   ===> get specifc Product by id
// @route  ===> GET  /api/v1/products/:id
// @access ===> public
export const getProduct = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    
    const product = await ProductModel
                    .findById(id)
                    .populate({path: "category subCategory brand" , select :'name'})

    if(!product){
        return next(ApiError(`not found product for this id ${id}` , 404))
    }

    res.status(200).json({
        data: product,
        msg: "success"
    })
})


// @desc   ===> Delete Product
// @route  ===> DELETE  /api/v1/products/:id
// @access ===> Private
export const deleteProduct = expressAsyncHandler ( async (req , res , next) => {
    const id = req.params.id

    const product = await ProductModel.findByIdAndDelete(id)

    if(!product){
        return next(ApiError(`not found product for this id ${id}` , 404))
    }
    res.status(200).json({
        msg: "product deleted successfully"
    })
})


// @desc   ===> Create Product
// @route  ===> POST  /api/v1/products
// @access ===> Private
export const createProduct = expressAsyncHandler( async (req ,res) => {

    const product = await ProductModel.create( req.body );

    res.status(201).json(
        {
            data: product ,
            msg: "created successfully..."
        }
    );
})


// @desc   ===> update Product by id
// @route  ===> PUT  /api/v1/products/:id
// @access ===> Private
export const updateProduct = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id

    const product = await ProductModel.findOneAndUpdate(
        {_id : id} ,  
        req.body,
        {new: true}
    )

    if(!product){
        return next(ApiError(`not found product for this id ${id}` , 404))
    }

    res.status(200).json({
        data: product,
        msg: "success"
    })
})