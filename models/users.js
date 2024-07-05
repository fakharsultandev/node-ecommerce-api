const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Personal information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Address information
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },

  // Contact information
  phone: {
    type: String,
  },

  // Order history
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  // Wishlist
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  // Payment information
  paymentMethods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
  ],

  // Other information
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
