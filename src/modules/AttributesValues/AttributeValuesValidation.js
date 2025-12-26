import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";
import {AttributeModel} from "../Attributes/AttributeModel.js"
import { AttributeValuesModel } from "./AttributesValuesModel.js";

export function createAttributeValuesValidator () {       
    return [
        check("attributeId")
            .notEmpty().withMessage('attribute id required')
            .isMongoId().withMessage("invaild id format")
            .custom(val => AttributeModel.findById(val).then((result)=> {
                if(!result) {
                    return Promise.reject("attribute id is invaild")
                }
            })),
        check("values")
            .isArray().withMessage('attribute values must be array'),
        check("values.*.title")
            .notEmpty().withMessage("title is required")
            .custom(async (val) => {
                const exists = await AttributeValuesModel.findOne({ title: val })

                if (exists) {
                    throw new Error("title already exists")
                }

                return true
            }),
        check("values.*.arTitle")
            .notEmpty().withMessage("arTitle is required")
            .custom(async (val) => {
                const exists = await AttributeValuesModel.findOne({ arTitle: val })

                if (exists) {
                throw new Error("arTitle already exists")
                }

                return true
            }),
        validatorMiddleware()
    ]
}

export function getAttributeValueValidator() {
  return [
    check("id")
      .notEmpty().withMessage("AttributeValue id required")
      .isMongoId().withMessage("invalid AttributeValue id format"),
      
    validatorMiddleware()
  ];
}


export function updateAttributeValueValidator () {
    return [
        check("id")
            .notEmpty().withMessage("AttributeValue id required")
            .isMongoId().withMessage("invalid AttributeValue id format"),
        
        check("title")
            .notEmpty().withMessage("AttributeValue title required")
            .custom(async (val) => {
                const exists = await AttributeValuesModel.findOne({ title: val })

                if (exists) {
                    throw new Error("title already exists")
                }

                return true
            }),
        
        check("arTitle")
            .notEmpty().withMessage("AttributeValue arTitle required")
            .custom(async (val) => {
                const exists = await AttributeValuesModel.findOne({ arTitle: val })

                if (exists) {
                    throw new Error("arTitle already exists")
                }

                return true
            }),


        validatorMiddleware()
    ]
}


export function deleteAttributeValueValidator () {
    return [
        check("id")
            .notEmpty().withMessage("AttributeValue id required")
            .isMongoId().withMessage("invalid AttributeValue id format"),
            
        validatorMiddleware()
    ]
}