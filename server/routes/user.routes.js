const express = require("express");
const router = express.Router();

const {
  getUser,
  registerCustomer,
  registerRestaurantManager,
} = require("../controllers");

const { auth } = require("../middleware");

router.get("/user", auth, getUser);

router.post("/register/customer", registerCustomer);

router.post("/register/restaurant-manager", registerRestaurantManager);

module.exports = router;
