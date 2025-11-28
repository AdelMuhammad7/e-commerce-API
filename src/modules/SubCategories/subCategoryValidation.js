import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";

export function getSubCategoryValidator() {
  return [
    check("id")
      .notEmpty().withMessage("SubCategory id required")
      .isMongoId().withMessage("invalid SubCategory id format"),
      
    validatorMiddleware()
  ];
}


export function createSubCategoryValidator () {
    return [
        check('name')
            .notEmpty().withMessage('SubCategory name required')
            .isLength({min : 3}).withMessage('too short length of SubCategory name')
            .isLength({max: 32}).withMessage("too much length of SubCategory name"),
        
        check('categoryId')
            .isMongoId().withMessage("invaild category id format"),

        validatorMiddleware()
    ]
}

export function updateSubCategoryValidator () {
    return [
        check("id")
            .notEmpty().withMessage("SubCategory id required")
            .isMongoId().withMessage("invalid SubCategory id format"),

        // name OPTIONAL
        check("name")
            .optional()
            .isLength({min : 3}).withMessage('too short length of SubCategory name')
            .isLength({max: 32}).withMessage("too much length of SubCategory name"),

        // categoryId OPTIONAL ⭐⭐⭐
        check("categoryId")
            .optional()
            .isMongoId().withMessage("invalid category id format"),

        validatorMiddleware()
    ]
}



export function deleteSubCategoryValidator () {
    return [
        check("id")
            .notEmpty().withMessage("SubCategory id required")
            .isMongoId().withMessage("invalid SubCategory id format"),
            
        validatorMiddleware()
    ]
}