const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Order = require("../models/Order");
const { validateDeliveryAddress } = require("../lib/deliveryValidation");
const { optional: optionalCustomerAuth } = require("../middleware/customerAuth");
const { sendNewOrderEmail } = require("../lib/mailer");

// ─────────────────────────────────────────────────────────────
// POST /api/orders/validate-delivery — Validate Georgetown Delivery Eligibility
// ─────────────────────────────────────────────────────────────
router.post("/validate-delivery", async (req, res) => {
  try {
    const { address } = req.body || {};
    const result = await validateDeliveryAddress(address);

    if (!result.allowed) {
      return res.status(400).json({
        allowed: false,
        message: result.message,
      });
    }

    res.json({ allowed: true, message: result.message });
  } catch (err) {
    console.error("❌ Delivery validation error:", err);
    res.status(500).json({
      allowed: false,
      message: "Sorry, we currently deliver only within Georgetown.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/orders — Place New Order
// ─────────────────────────────────────────────────────────────
router.post(
  "/",
  optionalCustomerAuth,
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
      const isDeliveryOrder = req.body.orderType === "delivery";
      if (isDeliveryOrder) {
        const deliveryCheck = await validateDeliveryAddress(req.body.deliveryAddress);
        if (!deliveryCheck.allowed) {
          return res.status(400).json({
            message: deliveryCheck.message,
          });
        }
      }

      const order = new Order({
        ...req.body,
        customerId: req.customer ? req.customer._id : undefined,
      });

      await order.save();

      sendNewOrderEmail(order).catch((err) => console.error("❌ Email notification error:", err.message));

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