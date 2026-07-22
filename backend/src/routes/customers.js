const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const Customer = require("../models/Customer");
const Order = require("../models/Order");
const customerAuth = require("../middleware/customerAuth");

function signToken(customer) {
  return jwt.sign({ id: customer._id, role: "customer" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

// ─────────────────────────────────────────────────────────────
// POST /api/customers/signup
// ─────────────────────────────────────────────────────────────
router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, email, password, phone } = req.body;
      const existing = await Customer.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(409).json({ message: "An account with that email already exists." });
      }

      const customer = new Customer({ name, email, password, phone });
      await customer.save();

      const token = signToken(customer);
      res.status(201).json({
        token,
        customer: { id: customer._id, name: customer.name, email: customer.email, phone: customer.phone },
      });
    } catch (err) {
      console.error("❌ Customer signup error:", err);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// ─────────────────────────────────────────────────────────────
// POST /api/customers/login
// ─────────────────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({ email: email.toLowerCase() });
      if (!customer) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      const match = await customer.comparePassword(password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = signToken(customer);
      res.json({
        token,
        customer: { id: customer._id, name: customer.name, email: customer.email, phone: customer.phone },
      });
    } catch (err) {
      console.error("❌ Customer login error:", err);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// ─────────────────────────────────────────────────────────────
// GET /api/customers/me
// ─────────────────────────────────────────────────────────────
router.get("/me", customerAuth, async (req, res) => {
  res.json({
    id: req.customer._id,
    name: req.customer.name,
    email: req.customer.email,
    phone: req.customer.phone,
  });
});

// ─────────────────────────────────────────────────────────────
// GET /api/customers/me/orders — order history for the logged-in customer
// ─────────────────────────────────────────────────────────────
router.get("/me/orders", customerAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { customerId: req.customer._id },
        { "customer.email": req.customer.email },
      ],
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Customer order history error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
