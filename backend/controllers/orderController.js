import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// create new order, protect
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      // Store product’s ID
      product: x._id,
      // Remove old ID so MongoDB makes a new one for this order item
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// get logged in user's orders, protect
const getMyOrders = asyncHandler(async (req, res) => {
  // in the User model, user field stores ObjectId of the user
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// get order by id, protect
const getOrderById = asyncHandler(async (req, res) => {
  // populate("user") fetches  User document whose _id matches user field, Only include name and email fields of User document.
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// update order to paid status, protect
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // from PayPal payment result object
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// update order to delivered, admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "update order to delivered",
  });
});

// get all orders, admin
const getOrders = asyncHandler(async (req, res) => {
  // populate("user") fetches  User document whose _id matches user field, Only include name and id fields of User document.
  const orders = await Order.find().populate("user", "id name");

  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
