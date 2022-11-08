const express = require("express");
const router = express.Router();

const {
  getOrder,
  getRestaurantOrders,
  getCustomerOrders,
  getOngoingOrders,
  placeOrder,
  updateOrderStatus,
  assignDeliveryAgentToOrder,
  closeOrder,
} = require("../controllers");

const { auth } = require("../middleware");

router.get("/order/:orderId", getOrder);

router.get("/order/restaurant/:restaurantId", getRestaurantOrders);

router.get("/orders/customer", auth, getCustomerOrders);

router.get("/orders/ongoing", auth, getOngoingOrders);

router.post("/order", placeOrder);

router.put("/order-status", updateOrderStatus);

router.put("/order/accept", auth, assignDeliveryAgentToOrder);

router.post("/close-order", closeOrder);

module.exports = router;
