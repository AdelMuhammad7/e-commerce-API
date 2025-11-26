import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";

export function getCategoryValidator() {
  return [
    check("id")
      .notEmpty().withMessage("category id required")
      .isMongoId().withMessage("invalid category id format"),
      
    validatorMiddleware()
  ];
}


export function createCategoryValidator () {
    return [
        check('name')
            .notEmpty().withMessage('category name required')
            .isLength({min : 3}).withMessage('too short length of category name')
            .isLength({max: 32}).withMessage("too much length of category name"),
        
        validatorMiddleware()
    ]
}

export function updateCategoryValidator () {
    return [
        check("id")
            .notEmpty().withMessage("category id required")
            .isMongoId().withMessage("invalid category id format"),
            
        validatorMiddleware()
    ]
}


export function deleteCategoryValidator () {
    return [
        check("id")
            .notEmpty().withMessage("category id required")
            .isMongoId().withMessage("invalid category id format"),
            
        validatorMiddleware()
    ]
}