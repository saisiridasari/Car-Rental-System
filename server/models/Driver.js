const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Enter valid 10-digit phone number"]
    },

    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true, // ✅ keep this
      uppercase: true,
      trim: true
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// ❌ REMOVED duplicate index

module.exports = mongoose.model("Driver", driverSchema);