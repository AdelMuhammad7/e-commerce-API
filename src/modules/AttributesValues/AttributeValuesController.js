import expressAsyncHandler from "express-async-handler";
import { AttributeValuesModel } from "./AttributesValuesModel.js";
import { ApiError } from "../../middleware/globalErrorHandler.js";


// @desc   ===> Create values
// @route  ===> POST  /api/v1/attributeValues
// @access ===> Private
export const createAttributeValues = expressAsyncHandler(async (req, res) => {

  const { values, attributeId } = req.body;

  if (!Array.isArray(values) || values.length === 0) {
    return next(ApiError(`values must be an array` , 404))
  }

  const docs = values.map(v => ({
    title: v.title,
    arTitle: v.arTitle,
    attribute: attributeId
  }));

  const result = await AttributeValuesModel.insertMany(docs);

  res.status(201).json({
    msg: "values created successfully",
    data: result
  });

});


// @desc   ===> Get All AttributeValues
// @route  ===> Get  /api/v1/attributeValues
// @access ===> Public
export const getAttributeValues = expressAsyncHandler(async (req, res) => {
  // paganition
  const page = req.query.page * 1 || 1
  const limit = req.query.limit * 1 || 5
  const skip = (page - 1) * limit

  const attributeValues = await AttributeValuesModel.find().skip(skip).limit(limit)

  res.status(201).json({
    results: attributeValues.length,
    page,
    data: attributeValues,
    msg: "success"
  });
})


// @desc   ===> get specifc attributeValue by id
// @route  ===> GET  /api/v1/attributeValues/:id
// @access ===> public
export const getAttributeValue = expressAsyncHandler( async (req , res , next) => {
  const id = req.params.id
  
  const attributeValue = await AttributeValuesModel.findById(id)
                        .populate({path: "attribute" , select: "name arName"})

  if(!attributeValue){
    return next(ApiError(`not found attributeValue for this id ${id}` , 404))
  }

  res.status(200).json({
    data: attributeValue,
    msg: "success"
  })
})


// @desc   ===> Delete Attribute Value
// @route  ===> DELETE  /api/v1/attributeValues/:id
// @access ===> Private
export const deleteAttributeValue = expressAsyncHandler ( async (req , res , next) => {
    const id = req.params.id

    const attributeValue = await AttributeValuesModel.findByIdAndDelete(id)

    if(!attributeValue){
        return next(ApiError(`not found attributeValue for this id ${id}` , 404))
    }
    res.status(200).json({
        msg: "attributeValue deleted successfully"
    })
})


// @desc   ===> update attributeValue by id
// @route  ===> PUT  /api/v1/attributeValue/:id
// @access ===> Private
export const updateAttributeValue = expressAsyncHandler( async (req , res , next) => {
    const id = req.params.id
    const {title , arTitle} = req.body

    const attributeValue = await AttributeValuesModel.findOneAndUpdate(
        {_id : id} ,  
        {title , arTitle},
        {new: true}
    )

    if(!attributeValue){
        return next(ApiError(`not found attributeValue for this id ${id}` , 404))
    }

    res.status(200).json({
        data: attributeValue,
        msg: "success"
    })
})