const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getAllBookings
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// User
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);

// Admin
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;