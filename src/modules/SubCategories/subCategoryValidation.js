import { body, check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";
import slugify from "slugify";

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
            .isLength({min : 2}).withMessage('too short length of SubCategory name'),
        
        check('category')
            .isMongoId().withMessage("invaild category id format"),

        check("name").custom((val , {req})=> {
            req.body.slug = slugify(val)
            return true;
        }),
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

        body("name").custom((val , {req})=> {
            req.body.slug = slugify(val)
            return true;
        }),
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