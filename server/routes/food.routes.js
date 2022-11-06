const express = require("express");
const router = express.Router();

const { getFoodItems, addFoodItems } = require("../controllers");

router.get("/food", getFoodItems);

router.post("/food", addFoodItems);

module.exports = router;
