const express = require("express");
const router = express.Router();

const {
  getFoodItems,
  addFoodItems,
  getRestaurantDishes,
} = require("../controllers");

router.get("/food", getFoodItems);

router.get("/dishes/restaurant/:restaurantId", getRestaurantDishes);

router.post("/food", addFoodItems);

module.exports = router;
