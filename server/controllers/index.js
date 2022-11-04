const authControllers = require("./auth.controller");
const userControllers = require("./user.controller");
const restaurantControllers = require("./restaurant.controller");
const foodControllers = require("./food.controller");
const orderControllers = require("./order.controller");

module.exports = {
  ...authControllers,
  ...userControllers,
  ...restaurantControllers,
  ...foodControllers,
  ...orderControllers,
};
