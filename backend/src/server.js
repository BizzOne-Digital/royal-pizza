require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRouter = require("./routes/orders");
const leadsRouter = require("./routes/leads");
const adminRouter = require("./routes/admin");
const MenuItem = require("./models/MenuItem");

const app = express();

const MONGO_URI = process.env.MONGODB_URI;

// ─────────────────────────────────────────────────────────────
// MongoDB Connection
// ─────────────────────────────────────────────────────────────

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "royal-pizza",
    });

    isConnected = true;

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://royal-pizza-xi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB for every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

app.use("/api/orders", ordersRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find({
      available: true,
    }).sort({
      category: 1,
      sortOrder: 1,
    });

    res.json(items);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.path} not found`,
  });
});

module.exports = app;