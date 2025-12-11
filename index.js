// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✔ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// TEST Route
app.get("/", (req, res) => {
  res.json({ message: "StyleHub Backend API is working!" });
});

// Example routes (create your own files later)
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, title: "T-shirt", price: 299 },
    { id: 2, title: "Hoodie", price: 799 },
  ]);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
