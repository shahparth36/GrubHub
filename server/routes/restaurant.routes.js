const express = require("express");
const router = express.Router();

const {
  getRestaurants,
  addRestaurant,
  addRestaurantManager,
} = require("../controllers");

router.get("/restaurants", getRestaurants);

router.post("/restaurant", addRestaurant);

router.post("/restaurant-manager", addRestaurantManager);

module.exports = router;
