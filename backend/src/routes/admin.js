const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");
const { upload, cloudinary } = require("../middleware/upload");

// ─── Auth ────────────────────────────────────────────────────────────────────

// POST /api/admin/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(401).json({ message: "Invalid credentials." });

      const match = await admin.comparePassword(password);
      if (!match) return res.status(401).json({ message: "Invalid credentials." });

      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ token, admin: { email: admin.email, name: admin.name, role: admin.role } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// ─── Analytics/Stats ─────────────────────────────────────────────────────────

// GET /api/admin/stats
router.get("/stats", auth, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [totalOrders, pendingOrders, todayOrders, allOrders] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ["pending", "preparing"] } }),
      Order.find({ createdAt: { $gte: startOfDay } }),
      Order.find().sort({ createdAt: -1 }).limit(50),
    ]);

    const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
    const totalRevenue = (await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]))[0]?.total ?? 0;

    // Top items
    const itemAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    const topItems = itemAgg.map((i) => ({ name: i._id, count: i.count }));

    const recentOrders = allOrders.slice(0, 8).map((o) => ({
      _id: o._id,
      customer: { name: o.customer.name },
      total: o.total,
      status: o.status,
      createdAt: o.createdAt,
    }));

    res.json({ totalOrders, pendingOrders, todayRevenue, totalRevenue, topItems, recentOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// ─── Orders ──────────────────────────────────────────────────────────────────

// GET /api/admin/orders
router.get("/orders", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 40 } = req.query;
    const query = status && status !== "all" ? { status } : {};
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// GET /api/admin/orders/:id
router.get("/orders/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Not found." });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/admin/orders/:id/status
router.patch("/orders/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "preparing", "ready", "delivered", "cancelled"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status." });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Not found." });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// ─── Menu CRUD ───────────────────────────────────────────────────────────────

// GET /api/admin/menu
router.get("/menu", auth, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, sortOrder: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/admin/menu
router.post("/menu", auth, async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/admin/menu/:id
router.put("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Not found." });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/admin/menu/:id (partial update, e.g. toggle available)
router.patch("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found." });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/admin/menu/:id
router.delete("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found." });
    // Delete image from Cloudinary if exists
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId).catch(() => {});
    }
    res.json({ message: "Item deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// POST /api/admin/menu/:id/image — Cloudinary upload
router.post("/menu/:id/image", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        imageUrl: req.file.path,
        imagePublicId: req.file.filename,
      },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Upload failed." });
  }
});

// ─── Leads ───────────────────────────────────────────────────────────────────

// GET /api/admin/leads
router.get("/leads", auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH /api/admin/leads/:id
router.patch("/leads/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Not found." });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/admin/leads/:id
router.delete("/leads/:id", auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
