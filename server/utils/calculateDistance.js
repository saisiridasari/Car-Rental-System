// Simple distance calculator
// NOTE: This is a mock logic (since no maps API is used)
// You can later replace with Google Maps API

const calculateDistance = (pickup, drop) => {
  if (!pickup || !drop) {
    throw new Error("Pickup and Drop locations are required");
  }

  // Basic mock logic (string-based pseudo distance)
  const distance =
    Math.abs(pickup.length - drop.length) * 10 + 5;

  return distance; // in KM
};

module.exports = calculateDistance;