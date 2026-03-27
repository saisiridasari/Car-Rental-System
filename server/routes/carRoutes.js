const express = require("express");
const router = express.Router();

const {
  getCars,
  getCarById,   
  addCar,
  updateCar,
  deleteCar
} = require("../controllers/carController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getCars);
router.get("/:id", getCarById); 

router.post("/", protect, adminOnly, addCar);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);


module.exports = router;