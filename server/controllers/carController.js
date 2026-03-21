const Car = require("../models/Car");

// Get all cars (public)
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add car (admin)
exports.addCar = async (req, res) => {
  try {
    const { name, pricePerKm, baseRent, category } = req.body;

    const car = await Car.create({
      name,
      pricePerKm,
      baseRent,
      category
    });

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update car (admin)
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete car (admin)
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ msg: "Car deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};