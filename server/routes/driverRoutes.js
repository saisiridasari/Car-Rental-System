const express = require("express");
const router = express.Router();

const {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver
} = require("../controllers/driverController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Get drivers (used in booking dropdown)
router.get("/", protect, getDrivers);

// Admin controls
router.post("/", protect, adminOnly, addDriver);
router.put("/:id", protect, adminOnly, updateDriver);
router.delete("/:id", protect, adminOnly, deleteDriver);

module.exports = router;