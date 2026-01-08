import express from "express";
import { createBrand, deleteBrand, getBrand, getBrands, resizeImage, updateBrand, uploadBrandImage } from "./BrandController.js";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "./BrandValidation.js";


export const router = express.Router();



router.route("/")
    .get(getBrands)
    .post( uploadBrandImage , resizeImage ,createBrandValidator(), createBrand)

router.route("/:id")
    .get(getBrandValidator(), getBrand)
    .put(uploadBrandImage , resizeImage , updateBrandValidator() , updateBrand)
    .delete(deleteBrandValidator(),  deleteBrand)