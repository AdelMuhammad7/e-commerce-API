import expressAsyncHandler from "express-async-handler"
import { BrandModel } from "./BrandModel.js"
import slugify from "slugify"
import { ApiError } from "../../middleware/globalErrorHandler.js"



// @desc   ===> Get All brands
// @route  ===> Get  /api/v1/brands
// @access ===> Public
export const getBrands = expressAsyncHandler( async (req ,res) => {
    // paganition
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const brands = await BrandModel.find({}).skip(skip).limit(limit)
    
    res.status(200).json({
        results: brands.length,
        page,
        data: brands,
        msg: "success"
    })
})


// @desc   ===> Create Brand
// @route  ===> POST  /api/v1/brands
// @access ===> Private
export const createBrand = expressAsyncHandler( async (req ,res) => {
    const name = req.body.name;

    const brand = await BrandModel.create({name , slug: slugify(name )} );
    res.status(201).json({data: brand , msg: "created successfully..."});

})


// @desc   ===> Delete Brand
// @route  ===> DELETE  /api/v1/brands/:id
// @access ===> Private
export const deleteBrand = expressAsyncHandler ( async (req , res , next) => {
    const id = req.params.id

    const brand = await BrandModel.findByIdAndDelete(id)

    if(!brand){
        return next(ApiError(`not found brand for this id ${id}` , 404))
    }

    res.status(200).json({
        msg: "brand deleted successfully"
    })
})


// @desc   ===> get specifc Brand by id
// @route  ===> GET  /api/v1/brands/:id
// @access ===> public
export const getBrand = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    
    const brand = await BrandModel.findById(id)

    if(!brand){
        return next(ApiError(`not found brand for this id ${id}` , 404))
    }

    res.status(200).json({
        data: brand,
        msg: "success"
    })
})


// @desc   ===> update Brand by id
// @route  ===> PUT  /api/v1/brands/:id
// @access ===> Private
export const updateBrand = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    const name = req.body.name

    const brand = await BrandModel.findOneAndUpdate(
        {_id : id} ,  
        {
            name ,
            slug: slugify(name)
        } , 
        {new: true}
    )

    if(!brand){
        return next(ApiError(`not found brand for this id ${id}` , 404))
    }

    res.status(200).json({
        data: brand,
        msg: "success"
    })

})