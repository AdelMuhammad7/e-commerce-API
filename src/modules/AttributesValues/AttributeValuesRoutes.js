import express from "express";
import { createAttributeValues } from "./AttributeValuesController.js";

export const router = express.Router();


router.route("/")
    .post(createAttributeValues)