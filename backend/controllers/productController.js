import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find();
//   res.status(200).json(products);
// });

// paginate product
const getProducts = asyncHandler(async (req, res) => {
  // two products per page
  const pageSize = 4;
  // current page number
  const currentPage = +req.query.pageNumber || 1;
  // count documents
  const count = await Product.countDocuments();

  const products = await Product.find()
    // only return pageSize number of products (e.g. 2 per page).
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1));

  res.status(200).json({ products, currentPage, pages: Math.ceil(count / pageSize) });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    return res.json(product);
  }

  // valid _id, but no document in db
  res.status(404);
  throw new Error("Resource not found");
});

// admin, create a sample product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// admin, update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// admin, delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// create a new review on a product, protect
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    // .find returns first matching element
    // MongoDB ObjectIds can’t be compared directly like strings, .toString() makes sure both sides are plain strings for comparison
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    };

    // update review related fields on a product
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
