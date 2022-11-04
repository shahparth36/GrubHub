const userRoles = require("../constants").userRoles;

const User = require("../models").user;
const Restaurant = require("../models").restaurant;

const { default: mongoose } = require("mongoose");
const { generateToken, hashPassword } = require("../utils");

const addRestaurant = async (req, res, next) => {
  try {
    const { email, name, contactNo, address } = req.body;

    const restaurantExists = await Restaurant.findOne({ name });
    if (restaurantExists)
      throw new Error("Restaurant with given name already exists");

    const restaurantDetails = {
      name,
      contactNo,
      email,
      address,
    };

    const createdRestaurant = await Restaurant.create(restaurantDetails);

    return res
      .status(200)
      .json({
        message: "Added Restaurant Successfully",
        user: createdRestaurant,
      });
  } catch (error) {
    next(error);
  }
};

const addRestaurantManager = async (req, res, next) => {
  try {
    const { userId, restaurantId } = req.body;

    const restaurantManger = await User.findById(userId);
    if (!restaurantManger)
      throw new Error("Manager with given Id does not exist");

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("Restaurant with given Id does not exist");

    const managerExists = restaurant.managers.some(
      (managerId) => managerId.toString() === restaurantManger._id.toString()
    );
    if (managerExists)
      throw new Error("This user is already a manager of the given restaurant");
    const managerOfAnotherRestaurant = await Restaurant.findOne({
      managers: mongoose.Types.ObjectId(userId),
    });
    if (managerOfAnotherRestaurant)
      throw new Error("This user is already a manager of another restaurant");

    restaurant.managers.push(restaurantManger._id);
    restaurant.save();

    return res
      .status(200)
      .json({
        message: "Added restaurant manager to restaurant successfully.",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRestaurant,
  addRestaurantManager,
};
