const express = require("express");
const { Category } = require("../models/categories");
const validateId = require("../middlewares/validateId");
const { Product, validate } = require("../models/products");

const router = express.Router();

/**
 * GET - All Products
 */

router.get("/", async (req, res) => {
  const products = await Product.find().select("-description").sort("title");
  if (!products) return res.status(404).send("No products found.");
  res.send(products);
});

/**
 * GET - Product by ID
 */

router.get("/:id", validateId, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .send({ message: "The product with the given ID was not found." });
  res.send(product);
});

/**
 * GET - Product by CategoryID
 */

router.get("/category/:id", validateId, async (req, res) => {
  const product = await Product.find({ "category._id": req.params.id })
    .select("-description")
    .sort({ title: "asc" });
  if (!product)
    return res
      .status(404)
      .send({ message: "The product with the given ID was not found." });
  res.send(product);
});

/**
 * POST - Create a new Product
 */

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({ message: error?.details[0]?.message });

  const category = await Category.findById(req.body.categoryID);
  if (!category)
    return res.status(404).send({ message: "This category is not exist." });

  let product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: {
      _id: category._id,
      title: category.title,
    },
    rating: req.body.rating,
  });

  product = await product.save();
  res.send(product);
});

/**
 * PUT - Update the Product
 */

router.put("/:id", validateId, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send({ message: error?.details[0]?.message });

  const category = await Category.findById(req.body.categoryID);
  if (!category)
    return res.status(404).send({ message: "This category is not exist." });

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: {
        _id: category._id,
        title: category.title,
      },
      rating: req.body.rating,
    },
    { new: true }
  );

  if (!updatedProduct)
    return res.status(404).send({ message: "This product is not exist." });

  res.send(updatedProduct);
});

/**
 * DELETE - Delete the Product
 */

router.delete("/:id", validateId, async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

module.exports = router;
