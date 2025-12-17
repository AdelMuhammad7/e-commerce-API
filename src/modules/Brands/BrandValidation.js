import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";

export function getBrandValidator() {
  return [
    check("id")
      .notEmpty().withMessage("brand id required")
      .isMongoId().withMessage("invalid brand id format"),
      
    validatorMiddleware()
  ];
}


export function createBrandValidator () {
    return [
        check('name')
            .notEmpty().withMessage('brand name required')
            .isLength({min : 3}).withMessage('too short length of brand name')
            .isLength({max: 32}).withMessage("too much length of brand name"),
        
        validatorMiddleware()
    ]
}

export function updateBrandValidator () {
    return [
        check("id")
            .notEmpty().withMessage("brand id required")
            .isMongoId().withMessage("invalid brand id format"),
            
        validatorMiddleware()
    ]
}


export function deleteBrandValidator () {
    return [
        check("id")
            .notEmpty().withMessage("brand id required")
            .isMongoId().withMessage("invalid brand id format"),
            
        validatorMiddleware()
    ]
}