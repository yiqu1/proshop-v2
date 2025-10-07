import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:productId").get(getProduct).put(protect, admin, updateProduct);

export default router;
