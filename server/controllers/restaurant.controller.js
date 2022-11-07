const userRoles = require("../constants").userRoles;

const User = require("../models").user;
const Restaurant = require("../models").restaurant;
const Food = require("../models").food;

const { default: mongoose } = require("mongoose");
const { generateToken, hashPassword } = require("../utils");

const getSearchResults = async (req, res, next) => {
  try {
    const { searchValue } = req.query;
    const restaurants = await Restaurant.find({
      name: new RegExp(searchValue, "i"),
    });

    const dishes = await Food.find({
      name: new RegExp(searchValue, "i"),
    });

    const updatedRestaurantsFormat = restaurants.map((restaurant) => {
      return {
        _id: restaurant._id,
        name: restaurant.name,
        type: "Restaurant",
      };
    });

    const updatedDishesFormat = dishes.map((dish) => {
      return {
        _id: dish._id,
        name: dish.name,
        type: "Dish",
      };
    });

    const searchResults = updatedRestaurantsFormat.concat(updatedDishesFormat);

    return res.status(200).json({
      message: "Fetched search results successfully",
      searchResults,
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("Restaurant with given id does not exist");

    const dishesAtRestaurant = await Food.find({
      restaurant: restaurantId,
    });
    const categories = {};
    for (const dish of dishesAtRestaurant) {
      if (dish.category in categories) {
        categories[dish.category] = [...categories[dish.category], dish];
      } else {
        categories[dish.category] = [dish];
      }
    }

    return res.status(200).json({
      message: "Fetched restaurant successfully",
      restaurant: {
        ...restaurant.toJSON(),
        dishes: dishesAtRestaurant,
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});

    return res.status(200).json({
      message: "Fetched Restaurants Successfully",
      restaurants,
    });
  } catch (error) {
    next(error);
  }
};

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

    return res.status(200).json({
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

    return res.status(200).json({
      message: "Added restaurant manager to restaurant successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSearchResults,
  getRestaurant,
  getRestaurants,
  addRestaurant,
  addRestaurantManager,
};
