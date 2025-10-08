import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
// import Product from "../models/productModel.js";
// import { calcPrices } from "../utils/calcPrices.js";
// import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";

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

// const addOrderItems = asyncHandler(async (req, res) => {
//   const { orderItems, shippingAddress, paymentMethod } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   } else {
//     // NOTE: here we must assume that the prices from our client are incorrect.
//     // We must only trust the price of the item as it exists in
//     // our DB. This prevents a user paying whatever they want by hacking our client
//     // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

//     // get the ordered items from our database
//     const itemsFromDB = await Product.find({
//       _id: { $in: orderItems.map((x) => x._id) },
//     });

//     // map over the order items and use the price from our items from database
//     const dbOrderItems = orderItems.map((itemFromClient) => {
//       const matchingItemFromDB = itemsFromDB.find(
//         (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
//       );
//       return {
//         ...itemFromClient,
//         product: itemFromClient._id,
//         price: matchingItemFromDB.price,
//         _id: undefined,
//       };
//     });

//     // calculate prices
//     const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
//       calcPrices(dbOrderItems);

//     const order = new Order({
//       orderItems: dbOrderItems,
//       user: req.user._id,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     });

//     const createdOrder = await order.save();

//     res.status(201).json(createdOrder);
//   }
// });

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

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   // NOTE: here we need to verify the payment was made to PayPal before marking
//   // the order as paid
//   const { verified, value } = await verifyPayPalPayment(req.body.id);
//   if (!verified) throw new Error("Payment not verified");

//   // check if this transaction has been used before
//   const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
//   if (!isNewTransaction) throw new Error("Transaction has been used before");

//   const order = await Order.findById(req.params.id);

//   if (order) {
//     // check the correct amount was paid
//     const paidCorrectAmount = order.totalPrice.toString() === value;
//     if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// get all orders, admin
const getOrders = asyncHandler(async (req, res) => {
  // populate("user") fetches  User document whose _id matches user field, Only include name and id fields of User document.
  const orders = await Order.find().populate("user", "id name");

  res.status(200).json(orders);
});

// update order to delivered, admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
