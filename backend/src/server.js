require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRouter = require("./routes/orders");
const leadsRouter = require("./routes/leads");
const adminRouter = require("./routes/admin");

const MenuItem = require("./models/MenuItem");

const app = express();

// ─────────────────────────────────────────────────────
// MongoDB
// ─────────────────────────────────────────────────────

const MONGO_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB Connected");

  return cached.conn;
}

// ─────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────

app.use(
  cors({
    origin: [
      "https://royal-pizza-xi.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// ─────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connect middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Mongo Error:", err);

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// ─────────────────────────────────────────────────────
// Health
// ─────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Royal Pizza API Running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
  });
});

// ─────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────

app.use("/api/orders", ordersRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

// ─────────────────────────────────────────────────────
// Public Menu
// ─────────────────────────────────────────────────────

app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find({
      available: true,
    });

    res.json(items);
  } catch (err) {
    console.error("Menu Error:", err);

    res.status(500).json({
      message: "Menu fetch failed",
    });
  }
});

// ─────────────────────────────────────────────────────
// 404
// ─────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─────────────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    message: "Internal server error",
  });
});

// ─────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────

module.exports = app;

// ─────────────────────────────────────────────────────
// Localhost only
// ─────────────────────────────────────────────────────

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}