const express = require("express");
const router = express.Router();

const {
  getSearchResults,
  getRestaurant,
  getRestaurantByManagerId,
  getRestaurants,
  addRestaurant,
  addRestaurantManager,
} = require("../controllers");

router.get("/search", getSearchResults);

router.get("/restaurant/:restaurantId", getRestaurant);

router.get("/restaurant/manager/:managerId", getRestaurantByManagerId);

router.get("/restaurants", getRestaurants);

router.post("/restaurant", addRestaurant);

router.post("/restaurant-manager", addRestaurantManager);

module.exports = router;
