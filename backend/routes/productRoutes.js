import express from "express";
import { getProducts, getProduct } from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts);

router.route("/:productId").get(getProduct);

export default router;
