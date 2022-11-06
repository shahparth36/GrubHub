const Restaurant = require("../models").restaurant;
const Food = require("../models").food;

const getFoodItems = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().limit(3);

    let allFoodItems = [];

    for (const restaurant of restaurants) {
      const foodItems = await Food.find({
        restaurant: restaurant._id.toString(),
      });
      if (foodItems.length > 0) {
        const updatedFoodItems = foodItems.map((foodItem) => {
          return {
            ...foodItem.toJSON(),
            restaurant,
          };
        });
        allFoodItems = updatedFoodItems;
      }
    }

    return res.status(200).json({
      message: "Fetched Food Items Successfully",
      foodItems: allFoodItems,
    });
  } catch (error) {
    next(error);
  }
};

const addFoodItems = async (req, res, next) => {
  try {
    const { restaurantId, foodItems } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("No restaurant with given Id was found");

    const updatedFoodItems = foodItems.map((foodItem) => {
      return {
        ...foodItem,
        restaurant: restaurantId,
      };
    });

    await Food.insertMany(updatedFoodItems);

    return res.status(200).json({ message: "Added Food Items Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFoodItems,
  addFoodItems,
};
