const userRoles = require("../constants").userRoles;

const User = require("../models").user;

const { hashPassword } = require("../utils");

const getUser = async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

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

    const createdUser = await User.create(customerDetails);

    return res.status(200).json({
      message: "Customer Registration Successfull",
      user: createdUser,
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

    return res.status(200).json({
      message: "Restaurant Manager Registration Successfull",
      user: createdRestaurantManager,
    });
  } catch (error) {
    next(error);
  }
};

const registerDeliveryAgent = async (req, res, next) => {
  try {
    const { email, password, name, contactNo } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error("User with given email already exists");

    const hashedPassword = hashPassword(password);

    const deliveryAgentDetails = {
      name,
      contactNo,
      email,
      password: hashedPassword,
      role: userRoles.DELIVERY_AGENT,
    };

    const createdDeliveryAgent = await User.create(deliveryAgentDetails);

    return res.status(200).json({
      message: "Registration Successfull",
      user: createdDeliveryAgent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  registerCustomer,
  registerRestaurantManager,
  registerDeliveryAgent,
};
