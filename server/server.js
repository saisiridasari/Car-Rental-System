const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

/* ==============================
   GLOBAL MIDDLEWARE
============================== */
app.use(cors());
app.use(express.json());

/* ==============================
   ROUTES
============================== */
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/bookings", bookingRoutes);

/* ==============================
   HEALTH CHECK
============================== */
app.get("/", (req, res) => {
  res.send("Car Rental API is running...");
});

/* ==============================
   ERROR HANDLER (OPTIONAL BUT CLEAN)
============================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
    message: err.message
  });
});

/* ==============================
   DATABASE CONNECTION + SERVER
============================== */
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });