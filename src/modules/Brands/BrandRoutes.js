import express from "express";
import { createBrand, deleteBrand, getBrand, getBrands, resizeImage, updateBrand, uploadBrandImage } from "./BrandController.js";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "./BrandValidation.js";
import { allowedTo, protectRoute } from "../Users/AuthServices/authController.js";


export const router = express.Router();



router.route("/")
    .get(getBrands)
    .post(protectRoute , allowedTo("admin" , "manager") ,  uploadBrandImage , resizeImage ,createBrandValidator(), createBrand)

router.route("/:id")
    .get(getBrandValidator(), getBrand)
    .put(protectRoute , allowedTo("admin" , "manager") ,uploadBrandImage , resizeImage , updateBrandValidator() , updateBrand)
    .delete(protectRoute , allowedTo("admin") ,deleteBrandValidator(),  deleteBrand)