import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, resizeImage, updateProduct, uploadProductImage } from "./productController.js";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "./productValidator.js";
import { allowedTo, protectRoute } from "../Users/AuthServices/authController.js";

export const router = express.Router()

router.route("/")
    .get(getProducts)
    .post(protectRoute , allowedTo("admin" , "manager") ,uploadProductImage , resizeImage , createProductValidator() , createProduct)


router.route("/:id")
    .get(getProductValidator(), getProduct)
    .put(protectRoute , allowedTo("admin" , "manager") ,uploadProductImage , resizeImage , updateProductValidator(), updateProduct)
    .delete(protectRoute , allowedTo("admin") ,deleteProductValidator(), deleteProduct)