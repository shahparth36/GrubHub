const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  registerRestaurantManager,
} = require("../controllers");

router.post("/register/customer", registerCustomer);

router.post("/register/restaurant-manager", registerRestaurantManager);

module.exports = router;
