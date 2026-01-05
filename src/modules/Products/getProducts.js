import expressAsyncHandler from "express-async-handler"
import { ProductModel } from "./ProductModel.js"
import { ApiError } from "../../middleware/globalErrorHandler.js"
import qs from "qs"

// @desc   ===> Get All Products
// @route  ===> GET  /api/v1/products
// @access ===> Public
export const getProducts = expressAsyncHandler(async (req, res) => {

    // ========================== FILTER ==========================
    const queryStringObj = qs.parse(req.query)

    // exclude fields from filtering
    const excludesFields = ["page", "limit", "sort", "fields", "keyword"]
    excludesFields.forEach(field => delete queryStringObj[field])

    // advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryStringObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const parsedQuery = JSON.parse(queryStr)

    // ========================== SEARCH ==========================
    if (req.query.keyword) {
        parsedQuery.$or = [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } }
        ]
    }

    // ========================== PAGINATION ==========================
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 50
    const skip = (page - 1) * limit

    // ========================== BUILD QUERY ==========================
    let query = ProductModel.find(parsedQuery)
        .skip(skip)
        .limit(limit)
        .populate({
            path: "category subCategory brand",
            select: "name"
        })

    // ========================== SORT ==========================
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ")
        query = query.sort(sortBy)
    } else {
        query = query.sort("-createdAt")
    }

    // ========================== FIELDS LIMITING ==========================
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
    }

    // ========================== EXECUTE ==========================
    const products = await query

    // ========================== RESPONSE ==========================
    res.status(200).json({
        results: products.length,
        page,
        data: products,
        msg: "success"
    })
})