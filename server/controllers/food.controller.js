const Restaurant = require("../models").restaurant;
const Food = require("../models").food;

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
  addFoodItems,
};
