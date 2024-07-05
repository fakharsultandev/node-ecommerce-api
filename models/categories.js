const Joi = require("joi");
const mongoose = require("mongoose");

const Category = mongoose.model("categories", {
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: true,
  },
});

const validateCategory = (category) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
  });

  return schema.validate(category);
};

module.exports.Category = Category;
module.exports.validate = validateCategory;
