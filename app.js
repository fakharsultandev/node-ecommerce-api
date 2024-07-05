const cors = require("cors");
const config = require("config");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");

// Import routes modules from routes
const products = require("./routes/products");
const categories = require("./routes/categories");

// Check if MONGODB_URI is defined
if (!config.get("MONGODB_URI")) {
  console.log("FATAL ERROR: MONGODB_URI not defined.");
  process.exit(1);
}
// Load environment variables from configuration file
const MONGODB_URI = config.get("MONGODB_URI");
const PORT = config.get("PORT") || 3000;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.log("Cannot connect to MongoDB ..."));

const app = express();

// Set middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// use the routes
app.use("/api/products", products);
app.use("/api/categories", categories);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT} ...`));
