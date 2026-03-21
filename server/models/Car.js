const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true
    },

    pricePerKm: {
      type: Number,
      required: [true, "Price per km is required"],
      min: 1
    },

    baseRent: {
      type: Number,
      required: [true, "Base rent is required"],
      min: 0
    },

    // ✅ ADD THIS
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["economy", "sedan", "suv", "luxury"],
      lowercase: true
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);