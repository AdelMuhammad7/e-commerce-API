import { AttributeModel } from "./AttributeModel.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js";


// @desc   ===> Create Attribute
// @route  ===> POST  /api/v1/attributes
// @access ===> Private
export const createAttribute = createOne(AttributeModel)

// @desc   ===> get all Attributes
// @route  ===> GET  /api/v1/attributes?page=1&limit=10
// @access ===> Public
export const getAttributes = getAll(AttributeModel)


// @desc   ===> get one Attribute
// @route  ===> GET  /api/v1/attributes/:id
// @access ===> Public
export const getAttribute = getOne(AttributeModel)



// @desc   ===> Update Attribute
// @route  ===> PUT  /api/v1/attributes/:id
// @access ===> Private
export const UpdateAttribute = updateOne(AttributeModel)


// @desc   ===> Delete Attribute
// @route  ===> DELETE  /api/v1/attributes/:id
// @access ===> Private
export const deleteAttribute = deleteOne(AttributeModel)



