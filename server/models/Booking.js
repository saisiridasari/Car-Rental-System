const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true
    },

    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true
    },

    dropLocation: {
      type: String,
      required: [true, "Drop location is required"],
      trim: true
    },

    distance: {
      type: Number,
      required: true,
      min: 0
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "End date must be after start date"
      }
    }
  },
  { timestamps: true }
);

// Compound index for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Booking", bookingSchema);