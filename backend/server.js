import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRouters from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

// json body parser middleware, parses application/json
app.use(express.json());
// parses x-www-form-urlencoded body
app.use(express.urlencoded({ extended: true }));

// add cookie-parser, can access cookies in route handlers, Without it, req.cookies would be undefined.
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRouters);

// PayPal api
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
