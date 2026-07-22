const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const Admin = require("../models/Admin");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Lead = require("../models/Lead");
const Deal = require("../models/Deal");

const auth = require("../middleware/auth");

// ✅ Safe Cloudinary import
let upload = null;
let cloudinary = null;

try {
  const uploadModule = require("../middleware/upload");
  upload = uploadModule.upload;
  cloudinary = uploadModule.cloudinary;

  console.log("✅ Cloudinary loaded");
} catch (err) {
  console.log("⚠️ Cloudinary disabled");
}

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const match = await admin.comparePassword(password);

      if (!match) {
        return res.status(401).json({
          message: "Invalid credentials.",
        });
      }

      const token = jwt.sign(
        {
          id: admin._id,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        admin: {
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    } catch (err) {
      console.error("❌ Login Error:", err);

      res.status(500).json({
        message: "Server error.",
      });
    }
  }
);

// ─────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────

router.get("/stats", auth, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      pendingOrders,
      todayOrders,
      allOrders,
    ] = await Promise.all([
      Order.countDocuments(),

      Order.countDocuments({
        status: {
          $in: ["pending", "preparing"],
        },
      }),

      Order.find({
        createdAt: {
          $gte: startOfDay,
        },
      }),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(50),
    ]);

    const todayRevenue = todayOrders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );

    const revenueAgg = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    // ✅ Top Items
    const itemAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          count: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topItems = itemAgg.map((item) => ({
      name: item._id,
      count: item.count,
    }));

    // ✅ Recent Orders
    const recentOrders = allOrders.slice(0, 8).map((order) => ({
      _id: order._id,
      customer: {
        name: order.customer?.name || "Customer",
      },
      total: order.total || 0,
      status: order.status || "pending",
      createdAt: order.createdAt,
    }));

    res.json({
      totalOrders,
      pendingOrders,
      todayRevenue,
      totalRevenue,
      topItems,
      recentOrders,
    });
  } catch (err) {
    console.error("❌ Stats Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────

// GET ALL ORDERS
router.get("/orders", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 40 } = req.query;

    const query =
      status && status !== "all"
        ? { status }
        : {};

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json(orders);
  } catch (err) {
    console.error("❌ Orders Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// GET SINGLE ORDER
router.get("/orders/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (err) {
    console.error("❌ Order Fetch Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// UPDATE ORDER STATUS
router.patch("/orders/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "preparing",
      "ready",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (err) {
    console.error("❌ Status Update Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// MENU
// ─────────────────────────────────────────────────────────────

// GET MENU
router.get("/menu", auth, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({
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

// CREATE MENU ITEM
router.post("/menu", auth, async (req, res) => {
  try {
    const item = new MenuItem(req.body);

    await item.save();

    res.status(201).json(item);
  } catch (err) {
    console.error("❌ Menu Create Error:", err);

    res.status(400).json({
      message: err.message,
    });
  }
});

// UPDATE MENU ITEM
router.put("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    res.json(item);
  } catch (err) {
    console.error("❌ Menu Update Error:", err);

    res.status(400).json({
      message: err.message,
    });
  }
});

// PATCH MENU ITEM
router.patch("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    res.json(item);
  } catch (err) {
    console.error("❌ Menu Patch Error:", err);

    res.status(400).json({
      message: err.message,
    });
  }
});

// DELETE MENU ITEM
router.delete("/menu/:id", auth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    // ✅ Delete Cloudinary image safely
    if (
      cloudinary &&
      item.imagePublicId
    ) {
      try {
        await cloudinary.uploader.destroy(
          item.imagePublicId
        );
      } catch (err) {
        console.log("⚠️ Cloudinary delete failed");
      }
    }

    res.json({
      message: "Item deleted.",
    });
  } catch (err) {
    console.error("❌ Delete Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// IMAGE UPLOAD
if (upload) {
  router.post(
    "/menu/:id/image",
    auth,
    upload.single("image"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({
            message: "No file uploaded.",
          });
        }

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
        console.error("❌ Upload Error:", err);

        res.status(500).json({
          message: "Upload failed.",
        });
      }
    }
  );
}

// ─────────────────────────────────────────────────────────────
// DEALS
// ─────────────────────────────────────────────────────────────

// GET ALL DEALS
router.get("/deals", auth, async (req, res) => {
  try {
    const deals = await Deal.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error("❌ Deals Fetch Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// CREATE DEAL
router.post("/deals", auth, async (req, res) => {
  try {
    const deal = new Deal(req.body);
    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    console.error("❌ Deal Create Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE DEAL
router.put("/deals/:id", auth, async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!deal) return res.status(404).json({ message: "Deal not found." });
    res.json(deal);
  } catch (err) {
    console.error("❌ Deal Update Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// PATCH DEAL (e.g. toggle active)
router.patch("/deals/:id", auth, async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deal) return res.status(404).json({ message: "Deal not found." });
    res.json(deal);
  } catch (err) {
    console.error("❌ Deal Patch Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE DEAL
router.delete("/deals/:id", auth, async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ message: "Deal not found." });
    res.json({ message: "Deal deleted." });
  } catch (err) {
    console.error("❌ Deal Delete Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// ─────────────────────────────────────────────────────────────
// LEADS
// ─────────────────────────────────────────────────────────────

// GET LEADS
router.get("/leads", auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({
      createdAt: -1,
    });

    res.json(leads);
  } catch (err) {
    console.error("❌ Leads Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

// UPDATE LEAD
router.patch("/leads/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    res.json(lead);
  } catch (err) {
    console.error("❌ Lead Update Error:", err);

    res.status(400).json({
      message: err.message,
    });
  }
});

// DELETE LEAD
router.delete("/leads/:id", auth, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead deleted.",
    });
  } catch (err) {
    console.error("❌ Lead Delete Error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;