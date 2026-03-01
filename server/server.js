const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", orderRoutes);
app.use("/api/contact", contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});