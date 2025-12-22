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

    res.status(201).json({ data: attributeValues , msg: "created successfully..."});
});


