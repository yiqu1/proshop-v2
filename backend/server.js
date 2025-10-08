import path from "path";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
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

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// PayPal api
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// set __dirname to current directory (gives the absolute path)
const __dirname = path.resolve();
// f someone visits /uploads/filename.jpg, serve the file from uploads folder.
// static file serving, making images publicly accessible. .static shares a local folder with the outside world. path.join points to where that folder is on computer
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// handle upload api
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // React SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
