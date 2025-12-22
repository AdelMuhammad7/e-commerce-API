import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";


export function createAttributeValidator () {
    return [
        check('name')
            .notEmpty().withMessage('Attribute name required')
            .isLength({min : 3}).withMessage('too short length of Attribute name')
            .isLength({max: 32}).withMessage("too much length of Attribute name"),
        check("arName")
            .notEmpty().withMessage('Attribute arName required')
            .isLength({min : 3}).withMessage('too short length of Attribute arName')
            .isLength({max: 32}).withMessage("too much length of Attribute arName"),           
        
        validatorMiddleware()
    ]
}

export function deleteAttributeValidator () {
    return [
        check("id")
            .notEmpty().withMessage("attribute id required")
            .isMongoId().withMessage("invalid attribute id format"),
            
        validatorMiddleware()
    ]
}

export function getAttributeValidator () {
    return [
        check("id")
            .notEmpty().withMessage("attribute id required")
            .isMongoId().withMessage("invalid attribute id format"),
            
        validatorMiddleware()
    ]
}

export function updateAttributeValidator() {
    return [
        check("id")
            .notEmpty().withMessage("attribute id required")
            .isMongoId().withMessage("invalid attribute id format"),

        check("name")
            .notEmpty().withMessage("attribute name required"),


        check("arName")
            .notEmpty().withMessage("attribute arName required"),
            
        validatorMiddleware()
    ]
}