import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

// top3 rated products
// Note: define static routes before dynamic /:id routes. Its route matching logic in Express
router.get("/top", getTopProducts);

router
  .route("/:productId")
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// product review routes
router.route("/:productId/reviews").post(protect, createProductReview);

export default router;
