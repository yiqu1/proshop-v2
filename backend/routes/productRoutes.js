import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:productId").get(getProduct);

export default router;
