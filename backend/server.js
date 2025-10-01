import dotenv from "dotenv";
dotenv.config();
import express from "express";
import products from "./products.js";
import connectDB from "./config/db.js";
connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API is running..."));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:productId", (req, res) => {
  const product = products.find(
    (product) => product._id === req.params.productId
  );
  res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
