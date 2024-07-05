const express = require("express");
const validateId = require("../middlewares/validateId");
const { Category, validate } = require("../models/categories");

const router = express.Router();

/**
 * GET - Get all categories
 */

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("_id");
  res.send(categories);
});

/**
 * GET - Get by category id
 */

router.get("/:id", validateId, async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.send(category);
});

module.exports = router;
