const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  category: String,
  size: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, trim: true, lowercase: true },
    },
    items: [orderItemSchema],
    orderType: {
      type: String,
      enum: ["pickup", "delivery"],
      default: "pickup",
    },
    deliveryAddress: String,
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    notes: String,
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Index for efficient queries
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ "customer.phone": 1 });

module.exports = mongoose.model("Order", orderSchema);
