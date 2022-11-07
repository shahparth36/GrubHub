const authControllers = require("./auth.controller");
const userControllers = require("./user.controller");
const restaurantControllers = require("./restaurant.controller");
const foodControllers = require("./food.controller");
const orderControllers = require("./order.controller");
const reservationControllers = require("./reservation.controller");

module.exports = {
  ...authControllers,
  ...userControllers,
  ...restaurantControllers,
  ...foodControllers,
  ...orderControllers,
  ...reservationControllers,
};
