require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRouter = require("./routes/orders");
const leadsRouter = require("./routes/leads");
const adminRouter = require("./routes/admin");

const app = express();

const PORT = process.env.PORT || 4000;

// ✅ MongoDB Atlas URI
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://bizzone:bizzone@cluster0.bwpdzae.mongodb.net/royal-pizza?retryWrites=true&w=majority&appName=Cluster0";

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
  res.json({ status: "healthy" });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/orders", ordersRouter);
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

// ─── Public menu route ───────────────────────────────────────────────────────
const MenuItem = require("./models/MenuItem");

app.get("/api/menu", async (req, res) => {
  try {
    const { category } = req.query;

    const query = { available: true };

    if (category) {
      query.category = category;
    }

    const items = await MenuItem.find(query).sort({
      category: 1,
      sortOrder: 1,
    });

    res.json(items);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.path} not found.`,
  });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error.",
  });
});

// ─── MongoDB Connect ─────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`🍕 Royal Pizza API running → http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message);

    process.exit(1);
  });

module.exports = app;