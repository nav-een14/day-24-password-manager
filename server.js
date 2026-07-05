const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const passwordRoutes = require("./routes/passwordRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });

// Routes
app.use("/api/passwords", passwordRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🔐 Password Manager Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});