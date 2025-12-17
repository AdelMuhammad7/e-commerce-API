import express from "express";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./BrandController.js";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "./BrandValidation.js";



export const router = express.Router();

router.route("/")
    .get(getBrands)
    .post(createBrandValidator(), createBrand)

router.route("/:id")
    .get(getBrandValidator(), getBrand)
    .put( updateBrandValidator() , updateBrand)
    .delete(deleteBrandValidator(),  deleteBrand)