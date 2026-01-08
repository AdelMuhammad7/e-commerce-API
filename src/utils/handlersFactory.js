import expressAsyncHandler from "express-async-handler"
import { ApiError } from "../middleware/globalErrorHandler.js"
import ApiFeatures from "./apiFeatures.js"

// delete one by MODEL
export const deleteOne = (model) => 
    expressAsyncHandler ( async (req , res , next) => {
        const id = req.params.id
    
        const document = await model.findByIdAndDelete(id)
    
        if(!document){
            return next(ApiError(`not found document for this id ${id}` , 404))
        }
    
        res.status(200).json({
            msg: "document deleted successfully"
        })
    })

// get one by MODEL
export const getOne = (model, populateOptions) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params

    let query = model.findById(id)

    // this if i want to populate any one i make another solve in schema by query >>>> pre
    if (populateOptions) {
      query = query.populate(populateOptions)
    }

    const document = await query

    if (!document) {
      return next(new ApiError(`not found document for this id ${id}`, 404))
    }

    res.status(200).json({
      data: document,
      msg: "success",
    })
  })

// get all by MODEL
export const getAll = (model) => 
    expressAsyncHandler( async (req ,res) => {
        // build query
        const countDocuments = await model.countDocuments()
    
        const apiFeatures = new ApiFeatures(
            model.find(),
            req.query
        )
            .paginate(countDocuments)
            .filter()
            .search()
            .limitFields()
            .sort()
        
    
        // Execute query
        const document = await apiFeatures.mongooseQuery
        res.status(200).json({
            results: document.length,
            pagination: apiFeatures.paginationResult,
            data: document,
            msg: "success"
        })
    })


// updateOne by Model
export const updateOne = (model) => 
    expressAsyncHandler( async (req , res , next) => {
    
        const document = await model.findByIdAndUpdate(
            req.params.id ,  
            req.body, 
            {new: true}
        )
    
        if(!document){
            return next(ApiError(`not found document for this id ${req.params.id}` , 404))
        }
    
        res.status(200).json({
            data: document,
            msg: "success"
        })
    
    })


// createOne by MODEL
export const createOne = (model) => 
    expressAsyncHandler( async (req ,res) => {
 
        const document = await model.create(req.body);
        res.status(201).json({data: document , msg: "created successfully..."});
    
})

