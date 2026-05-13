const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Order = require("../models/Order");

// ─────────────────────────────────────────────────────────────
// POST /api/orders — Place New Order
// ─────────────────────────────────────────────────────────────
router.post(
  "/",
  [
    body("customer.name")
      .trim()
      .notEmpty()
      .withMessage("Name required"),

    body("customer.phone")
      .trim()
      .notEmpty()
      .withMessage("Phone required"),

    body("items")
      .isArray({ min: 1 })
      .withMessage("At least one item required"),

    body("total")
      .isNumeric()
      .withMessage("Total must be a number"),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    try {
      const order = new Order(req.body);

      await order.save();

      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (err) {
      console.error("❌ Order save error:", err);

      res.status(500).json({
        message: "Server error placing order.",
      });
    }
  }
);

// ─────────────────────────────────────────────────────────────
// GET /api/orders — Get All Orders (Admin Dashboard)
// ─────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch orders error:", err);

    res.status(500).json({
      message: "Server error fetching orders.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/orders/:id — Get Single Order
// ─────────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).select(
      "status customer.name orderType items total createdAt"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.json(order);
  } catch (err) {
    console.error("❌ Single order fetch error:", err);

    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;