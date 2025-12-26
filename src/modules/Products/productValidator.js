import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validatorMiddleware.js";
import {CategoryModel} from "../Categories/categoryModel.js"
import {SubCategoryModel} from "../SubCategories/subCategoryModel.js"
import {BrandModel} from "../Brands/BrandModel.js"

export function createProductValidator () {
    return [
        check('title')
            .notEmpty().withMessage('product title is required')
            .isLength({min : 3}).withMessage('too short length of product title'),
        check('description')
            .notEmpty().withMessage('product description is required'),
        check('image')
            .notEmpty().withMessage('product image is required'),
        check('gallery')
            .optional()
            .isArray().withMessage('product gallery must be <<<Array>>>'),
        check('price')
            .notEmpty().withMessage('product price is required')
            .isNumeric().withMessage('product price must be number'),
        check('priceAfterDiscount')
            .optional()
            .isNumeric().withMessage('product priceAfterDiscount must be number')
            .toFloat()
            .custom((value , {req})=> {
                if(req.body.price < value) {
                    throw new Error('priceAfterDiscount must be lower than price')
                }
                return true;
            }),
        check('stock')
            .notEmpty().withMessage('product stock is required')
            .isNumeric().withMessage('product stock must be number'),
        check('sold')
            .optional()
            .isNumeric().withMessage('product stock must be number'),
        check('category')
            .notEmpty().withMessage('product category is required')
            .isMongoId().withMessage('invaild id format')
            .custom((categoryId)=> CategoryModel.findById(categoryId).then((category)=> {
                if(!category) {
                    return Promise.reject(`No Category found for this id ${categoryId}`)
                }
            })),

        check('subCategory')
            .optional()
            .isMongoId().withMessage('invaild id format')
            .isArray().withMessage('subCategory must be an array')
// subcategoryIds >> Array .. i should check that is exist in database 
    // using find()
            .custom(
                (subCategoryIds)=> SubCategoryModel.find(
                    {_id : {$exists: true , $in : subCategoryIds}}).then((result)=> {
                        if(result.length < 1 || result.length !== subCategoryIds.length){
                            return Promise.reject("invaild subCategory ids")
                        }
                    }
                )
            )
    // using aggregate() but here find is better 
            // .custom((subCategoryIds) =>
            //     SubCategoryModel.aggregate([
            //         { $match: { _id: { $in: subCategoryIds } } }
            //     ])
            //     .then(result => {
            //         if (result.length < 1 || result.length !== subCategoryIds.length) {
            //         return Promise.reject("invalid subCategory ids")
            //         }
            //     })
            // )
// make another custom to identify subcategories related to category id or not
            .custom((value , {req}) => SubCategoryModel.find({category: req.body.category}).then(
                (subCategories)=> {
                    const subCategoriesIdsInDB = []
                    subCategories.forEach((el)=> {
                        subCategoriesIdsInDB.push(el._id.toString())
                    })

                    const checker = value.every((v) => subCategoriesIdsInDB.includes(v))
                    if(!checker) {
                        return Promise.reject("subCategory is not related to Category")
                    }
                }   
            )),
        check('brand')
            .optional()
            .isMongoId().withMessage('invaild id format')
            .custom((brandId)=> BrandModel.findById(brandId).then((brand)=> {
                if(!brand) {
                    return Promise.reject(`No Brand found for this id ${brandId}`)
                }
            })),
        check('ratingAverage')
            .optional()
            .isNumeric().withMessage('product ratingAverage must be number')
            .isLength({min : 1}).withMessage('Rating must between 1 to 5')
            .isLength({max : 5}).withMessage('Rating must between 1 to 5'),
        check('ratingQuantity')
            .optional()
            .isNumeric().withMessage('product ratingQuantity must be number'),
        
        validatorMiddleware()
    ]
}

export function getProductValidator() {
  return [
    check("id")
      .notEmpty().withMessage("product id required")
      .isMongoId().withMessage("invalid product id format"),
      
    validatorMiddleware()
  ];
}

export function updateProductValidator () {
    return [
        check("id")
            .notEmpty().withMessage("product id required")
            .isMongoId().withMessage("invalid product id format"),
            
        validatorMiddleware()
    ]
}

export function deleteProductValidator () {
    return [
        check("id")
            .notEmpty().withMessage("product id required")
            .isMongoId().withMessage("invalid product id format"),
            
        validatorMiddleware()
    ]
}