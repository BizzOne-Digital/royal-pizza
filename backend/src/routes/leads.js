const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Lead = require("../models/Lead");

// POST /api/leads — submit a contact/lead form
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name required"),
    body("message").trim().notEmpty().withMessage("Message required"),
    body("email").optional().isEmail().withMessage("Valid email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    try {
      const lead = new Lead(req.body);
      await lead.save();
      res.status(201).json({ message: "Message received! We'll be in touch soon." });
    } catch (err) {
      console.error("Lead save error:", err);
      res.status(500).json({ message: "Server error." });
    }
  }
);

module.exports = router;
