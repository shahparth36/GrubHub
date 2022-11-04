const express = require("express");
const router = express.Router();

const { placeOrder, updateOrderStatus, closeOrder } = require("../controllers");

router.post("/order", placeOrder);

router.put("/order-status", updateOrderStatus);

router.post("/close-order", closeOrder);

module.exports = router;
