// Calculates total booking price
// Formula: baseRent + (distance × pricePerKm)

const calculatePrice = (distance, pricePerKm, baseRent) => {
  if (!distance || distance < 0) {
    throw new Error("Invalid distance");
  }

  if (pricePerKm < 0 || baseRent < 0) {
    throw new Error("Invalid pricing values");
  }

  const total = baseRent + distance * pricePerKm;

  return Math.round(total);
};

module.exports = calculatePrice;