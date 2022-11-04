const mongoose = require("mongoose");

const models = {};
models.user = require("./user.model.js")(mongoose);
models.restaurant = require("./restaurant.model.js")(mongoose);
models.food = require("./food.model.js")(mongoose);
models.order = require("./order.model.js")(mongoose);

module.exports = models;
