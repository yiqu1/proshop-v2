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
import checkObjectId from "../middleware/checkObjectId.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

// top3 rated products
// Note: define static routes before dynamic /:id routes. Its route matching logic in Express
router.get("/top", getTopProducts);

router
  .route("/:productId")
  .get(checkObjectId, getProduct)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

// product review routes
router
  .route("/:productId/reviews")
  .post(protect, checkObjectId, createProductReview);

export default router;
