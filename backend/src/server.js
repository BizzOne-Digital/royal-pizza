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
// Middleware
// ─────────────────────────────────────────────────────

const allowedOrigins = [
  "https://royal-pizza-xi.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─────────────────────────────────────────────────────
// DB Connect Middleware
// ─────────────────────────────────────────────────────

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ Mongo Error:", err);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// ─────────────────────────────────────────────────────
// Health Routes
// ─────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Royal Pizza API Running",
    timestamp: new Date().toISOString(),
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
// Public Menu Route
// ─────────────────────────────────────────────────────

app.get("/api/menu", async (req, res) => {
  try {
    const { category } = req.query;

    const query = {
      available: true,
    };

    if (category) {
      query.category = category;
    }

    const items = await MenuItem.find(query).sort({
      category: 1,
      sortOrder: 1,
    });

    res.json(items);
  } catch (err) {
    console.error("❌ Menu Fetch Error:", err);

    res.status(500).json({
      message: "Menu fetch failed",
    });
  }
});

// ─────────────────────────────────────────────────────
// 404 Handler
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
  console.error("❌ Server Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// ─────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────

module.exports = app;

// ─────────────────────────────────────────────────────
// Localhost Only
// ─────────────────────────────────────────────────────

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}