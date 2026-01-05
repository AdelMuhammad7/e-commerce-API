import { BrandModel } from "./BrandModel.js"
import { createOne, deleteOne, getAll, getOne, updateOne } from "../../utils/handlersFactory.js"


// @desc   ===> Get All brands
// @route  ===> Get  /api/v1/brands
// @access ===> Public
export const getBrands = getAll(BrandModel)


// @desc   ===> Create Brand
// @route  ===> POST  /api/v1/brands
// @access ===> Private
export const createBrand = createOne(BrandModel)


// @desc   ===> Delete Brand
// @route  ===> DELETE  /api/v1/brands/:id
// @access ===> Private
export const deleteBrand = deleteOne(BrandModel)


// @desc   ===> get specifc Brand by id
// @route  ===> GET  /api/v1/brands/:id
// @access ===> public
export const getBrand = getOne(BrandModel)


// @desc   ===> update Brand by id
// @route  ===> PUT  /api/v1/brands/:id
// @access ===> Private
export const updateBrand = updateOne(BrandModel)