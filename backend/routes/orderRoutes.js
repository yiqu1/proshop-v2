import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:orderId").get(protect, getOrderById);
router.route("/:orderId/pay").put(protect, updateOrderToPaid);
router.route("/:orderId/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
