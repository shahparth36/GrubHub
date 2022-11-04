const express = require("express");
const router = express.Router();

const { addFoodItems } = require("../controllers");

router.post("/food", addFoodItems);

module.exports = router;
