const express = require("express");
const router = express.Router();

const {
  getSearchResults,
  getRestaurant,
  getRestaurants,
  addRestaurant,
  addRestaurantManager,
} = require("../controllers");

router.get("/search", getSearchResults);

router.get("/restaurant/:restaurantId", getRestaurant);

router.get("/restaurants", getRestaurants);

router.post("/restaurant", addRestaurant);

router.post("/restaurant-manager", addRestaurantManager);

module.exports = router;
