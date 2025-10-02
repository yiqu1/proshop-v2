import dotenv from "dotenv";
dotenv.config();
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
