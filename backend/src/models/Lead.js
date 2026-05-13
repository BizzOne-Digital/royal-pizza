const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true },
    source: {
      type: String,
      enum: ["contact-form", "chat", "phone", "other"],
      default: "contact-form",
    },
    contacted: { type: Boolean, default: false },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
