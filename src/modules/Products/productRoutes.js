import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, resizeImage, updateProduct, uploadProductImage } from "./productController.js";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "./productValidator.js";

export const router = express.Router()

router.route("/")
    .get(getProducts)
    .post(uploadProductImage , resizeImage , createProductValidator() , createProduct)


router.route("/:id")
    .get(getProductValidator(), getProduct)
    .put(uploadProductImage , resizeImage , updateProductValidator(), updateProduct)
    .delete(deleteProductValidator(), deleteProduct)