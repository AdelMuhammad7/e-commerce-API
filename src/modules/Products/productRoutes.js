import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./productController.js";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "./productValidator.js";

export const router = express.Router()

router.route("/")
    .get(getProducts)
    .post(createProductValidator() , createProduct)


router.route("/:id")
    .get(getProductValidator(), getProduct)
    .put(updateProductValidator(), updateProduct)
    .delete(deleteProductValidator(), deleteProduct)