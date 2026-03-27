// Create booking controller functions to handle booking operations.
// Validate request data and check car and driver availability before booking.
// Calculate distance and total price using utility functions.
// Save booking and update car and driver availability.
// Provide APIs to fetch user bookings and all bookings for admin.
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const Driver = require("../models/Driver");

const calculatePrice = require("../utils/calculatePrice");
const calculateDistance = require("../utils/calculateDistance");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const {
      carId,
      driverId,
      pickupLocation,
      dropLocation,
      startDate,
      endDate
    } = req.body;

    // Validation
    if (!carId || !driverId || !pickupLocation || !dropLocation || !startDate || !endDate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Fetch car & driver
    const car = await Car.findById(carId);
    const driver = await Driver.findById(driverId);

    if (!car || !driver) {
      return res.status(404).json({ msg: "Car or Driver not found" });
    }

    // Availability check
    if (!car.available) {
      return res.status(400).json({ msg: "Car not available" });
    }

    if (!driver.available) {
      return res.status(400).json({ msg: "Driver not available" });
    }

    // Distance calculation (backend)
    const distance = calculateDistance(pickupLocation, dropLocation);

    // Price calculation
    const totalPrice = calculatePrice(
      distance,
      car.pricePerKm,
      car.baseRent
    );

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      driverId,
      pickupLocation,
      dropLocation,
      distance,
      totalPrice,
      startDate,
      endDate
    });

    // Lock resources
    car.available = false;
    driver.available = false;

    await car.save();
    await driver.save();

    res.status(201).json({
      msg: "Booking successful",
      booking
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get My Bookings (User)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("carId")
      .populate("driverId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("carId")
      .populate("driverId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};