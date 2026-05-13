require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRouter = require("./routes/orders");
const leadsRouter = require("./routes/leads");
const adminRouter = require("./routes/admin");

const MenuItem = require("./models/MenuItem");

const app = express();

// ✅ MongoDB Atlas URI
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://bizzone:bizzone@cluster0.bwpdzae.mongodb.net/royal-pizza?retryWrites=true&w=majority&appName=Cluster0";

// ─── MongoDB Connection Cache (Vercel Fix) ───────────────────────────────────
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ MongoDB Atlas Connected");

  return cached.conn;
}

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Connect DB before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB Error:", err);

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Royal Pizza API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/orders", ordersRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

// ─── Public Menu Route ──────────────────────────────────────────────────────
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
      message: "Server error.",
    });
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.path} not found.`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error.",
  });
});

// ✅ Localhost Support
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🍕 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;