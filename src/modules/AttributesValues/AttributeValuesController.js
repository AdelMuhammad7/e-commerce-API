import expressAsyncHandler from "express-async-handler";
import { AttributeValuesModel } from "./AttributesValuesModel.js";
import { ApiError } from "../../middleware/globalErrorHandler.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import { deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js";


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
export const getAttributeValues = getAll(AttributeValuesModel)



// @desc   ===> get specifc attributeValue by id
// @route  ===> GET  /api/v1/attributeValues/:id
// @access ===> public
export const getAttributeValue = getOne(AttributeValuesModel)


// @desc   ===> Delete Attribute Value
// @route  ===> DELETE  /api/v1/attributeValues/:id
// @access ===> Private
export const deleteAttributeValue = deleteOne(AttributeValuesModel)


// @desc   ===> update attributeValue by id
// @route  ===> PUT  /api/v1/attributeValue/:id
// @access ===> Private
export const updateAttributeValue = updateOne(AttributeValuesModel)