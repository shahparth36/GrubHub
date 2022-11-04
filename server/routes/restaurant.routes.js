const express = require("express");
const router = express.Router();

const { addRestaurant, addRestaurantManager } = require("../controllers");

router.post("/restaurant", addRestaurant);

router.post("/restaurant-manager", addRestaurantManager);

module.exports = router;
