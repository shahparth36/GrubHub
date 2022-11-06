const express = require("express");
const router = express.Router();

const {
  getOrder,
  placeOrder,
  updateOrderStatus,
  closeOrder,
} = require("../controllers");

router.get("/order/:orderId", getOrder);

router.post("/order", placeOrder);

router.put("/order-status", updateOrderStatus);

router.post("/close-order", closeOrder);

module.exports = router;
