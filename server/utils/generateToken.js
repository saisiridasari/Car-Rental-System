const jwt = require("jsonwebtoken");

// Generates JWT token
const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error("Invalid user for token generation");
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

module.exports = generateToken;