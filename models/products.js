const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    trim: true,
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    trim: true,
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    }),
    required: true,
  },
  rating: {
    type: new mongoose.Schema(
      {
        rate: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
      { _id: false }
    ),
    required: true,
  },
});

const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(500).required(),
    image: Joi.string().required(),
    categoryID: Joi.objectId().required(),
    rating: Joi.object({
      rate: Joi.number().min(1).max(5).required(),
      count: Joi.number().required(),
    }).required(),
  });

  return schema.validate(product);
};

const Product = mongoose.model("Product", productSchema);

module.exports.Product = Product;
module.exports.validate = validateProduct;
