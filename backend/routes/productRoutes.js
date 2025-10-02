import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { nextTick } from "process";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);

    if (product) {
      return res.json(product);
    }

    // valid _id, but no document in db
    res.status(404);
    throw new Error("Resource not found");
  })
);

export default router;
