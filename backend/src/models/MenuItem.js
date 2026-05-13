const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["pizza", "sub", "wings", "pasta", "sides", "drinks", "desserts"],
      required: true,
    },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    imagePublicId: String, // Cloudinary public_id for deletion
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1, available: 1 });

module.exports = mongoose.model("MenuItem", menuItemSchema);
