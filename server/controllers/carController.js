// Create car controller functions for managing car data.
// Provide API to fetch all cars for users.
// Allow admin to add, update, and delete cars.
// Use MongoDB queries and handle errors properly.
const Car = require("../models/Car");

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.status(200).json(cars);
  } catch (err) {
    console.error("Get cars error:", err);
    res.status(500).json({ msg: "Failed to fetch cars" });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error("Get car error:", err);
    res.status(500).json({ msg: "Failed to fetch car" });
  }
};

exports.addCar = async (req, res) => {
  try {
    const { name, pricePerKm, baseRent, category } = req.body;

    if (!name || !pricePerKm || !baseRent) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const car = new Car({
      name,
      pricePerKm,
      baseRent,
      category: category || "economy"
    });

    await car.save();

    res.status(201).json(car);
  } catch (err) {
    console.error("Add car error:", err);
    res.status(500).json({ msg: "Failed to add car" });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error("Update car error:", err);
    res.status(500).json({ msg: "Failed to update car" });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    res.status(200).json({ msg: "Car deleted successfully" });
  } catch (err) {
    console.error("Delete car error:", err);
    res.status(500).json({ msg: "Failed to delete car" });
  }
};