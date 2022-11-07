const express = require("express");
const router = express.Router();

const {
  addReservation,
  getRestaurantReservations,
  getCustomerReservations,
} = require("../controllers");

router.get("/reservations/customer/:customerId", getCustomerReservations);

router.get("/reservations/restaurant/:restaurantId", getRestaurantReservations);

router.post("/reservation", addReservation);

module.exports = router;
