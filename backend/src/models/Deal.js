const mongoose = require("mongoose");

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const dealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    badge: { type: String, default: "" },
    group: {
      type: String,
      enum: ["bundle", "combo", "weekday"],
      default: "combo",
    },
    // Empty/absent = available every day.
    availableDays: { type: [String], enum: WEEKDAYS, default: [] },
    orderableOnline: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

dealSchema.index({ active: 1, sortOrder: 1 });

module.exports = mongoose.model("Deal", dealSchema);
module.exports.WEEKDAYS = WEEKDAYS;
