const Driver = require("../models/Driver");

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add driver (admin)
exports.addDriver = async (req, res) => {
  try {
    const { name, phone, licenseNumber } = req.body;

    const driver = await Driver.create({
      name,
      phone,
      licenseNumber
    });

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update driver (admin)
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete driver (admin)
exports.deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ msg: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};