import express from "express";
import { createCategory, getCategories } from "./categoryController.js";

export const router = express.Router();

router.route("/").get(getCategories).post(createCategory)


