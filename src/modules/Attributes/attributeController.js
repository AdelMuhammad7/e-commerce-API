import expressAsyncHandler from "express-async-handler";
import { AttributeModel } from "./AttributeModel.js";
import { ApiError } from "../../middleware/globalErrorHandler.js";
import { AttributeValuesModel } from "../AttributesValues/AttributesValuesModel.js";




// @desc   ===> Create Attribute
// @route  ===> POST  /api/v1/attributes
// @access ===> Private
export const createAttribute = expressAsyncHandler( async (req ,res) => {
    const {name , arName} = req.body;

    const attribute = await AttributeModel.create({name , arName} );
    res.status(201).json({data: attribute , msg: "created successfully..."});
})

// @desc   ===> get all Attributes
// @route  ===> GET  /api/v1/attributes?page=1&limit=10
// @access ===> Public
export const getAttributes = expressAsyncHandler(async (req , res) => {
    // paganition
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit

    const attributes = await AttributeModel.find().skip(skip).limit(limit)

    res.status(200).json({
        results: attributes.length,
        page,
        data: attributes,
        msg: "success"
    })
})

// @desc   ===> get one Attribute
// @route  ===> GET  /api/v1/attributes/:id
// @access ===> Public
export const getAttribute = expressAsyncHandler(async (req , res) => {
    const id = req.params.id

    const attribute = await AttributeModel.findById(id);

    if(!attribute){
        return next(ApiError(`not found attribute for this id ${id}` , 404))
    }

    const values = await AttributeValuesModel.find({ attribute: id });

    res.status(200).json({
        data: {
            ...attribute.toObject(),
            values
        },
        msg: "success"
    })
})


// @desc   ===> Update Attribute
// @route  ===> PUT  /api/v1/attributes/:id
// @access ===> Private
export const UpdateAttribute = expressAsyncHandler(async (req , res)=> {
    const id = req.params.id
    const {name , arName} = req.body

    const attribute = await AttributeModel.findByIdAndUpdate(
        id,
        {name , arName} ,
        {new: true , runValidators: true}
    )

    if(!attribute){
        return next(ApiError(`not found attribute for this id ${id}` , 404))
    }

    res.status(200).json({
        data: attribute,
        msg: "success"
    })
})


// @desc   ===> Delete Attribute
// @route  ===> DELETE  /api/v1/attributes/:id
// @access ===> Private
export const deleteAttribute = expressAsyncHandler(async (req, res) => {
    const id = req.params.id

    const attribute = await AttributeModel.findByIdAndDelete(id)

    if(!attribute){
        return next(ApiError(`not found attribute for this id ${id}` , 404))
    }

    res.status(200).json({
        msg: "attribute deleted successfully..."
    })
})



