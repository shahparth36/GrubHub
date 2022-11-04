const userRoles = require("../constants").userRoles;

const User = require("../models").user;

const { generateToken, hashPassword } = require("../utils");

const registerCustomer = async (req, res, next) => {
  try {
    const { email, password, name, contactNo, address } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error("User with given email already exists");

    const hashedPassword = hashPassword(password);

    const customerDetails = {
      name,
      contactNo,
      email,
      password: hashedPassword,
      address,
      role: userRoles.CUSTOMER,
    };

    const createdCustomer = await User.create(customerDetails);

    return res
      .status(200)
      .json({
        message: "Customer Registration Successfull",
        user: createdCustomer,
      });
  } catch (error) {
    next(error);
  }
};

const registerRestaurantManager = async (req, res, next) => {
  try {
    const { email, password, name, contactNo } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error("User with given email already exists");

    const hashedPassword = hashPassword(password);

    const restaurantManagerDetails = {
      name,
      contactNo,
      email,
      password: hashedPassword,
      role: userRoles.RESTURANT_MANAGER,
    };

    const createdRestaurantManager = await User.create(
      restaurantManagerDetails
    );

    return res
      .status(200)
      .json({
        message: "Restaurant Manager Registration Successfull",
        user: createdRestaurantManager,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  registerRestaurantManager,
};
