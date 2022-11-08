const User = require("../models").user;
const Restaurant = require("../models").restaurant;

const { generateToken, verifyPassword } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    const restaurantExists = await Restaurant.findOne({ email });

    if (!userExists && !restaurantExists)
      throw new Error("User with given email does not exist");

    const hashedPassword = userExists
      ? userExists.password
      : restaurantExists.password;
    const passwordValid = verifyPassword(password, hashedPassword);
    if (!passwordValid) throw new Error("Password does not match");

    const payload = {
      email: userExists ? userExists.email : restaurantExists.email,
      role: userExists ? userExists.role : restaurantExists.role,
    };

    generateToken(payload)
      .then(function (token) {
        return res.status(200).json({
          message: "Authenticated user successfully",
          accessToken: token,
          role: userExists ? userExists.role : "RESTAURANT_MANAGER",
          user: userExists ? userExists : restaurantExists,
        });
      })
      .catch(function (err) {
        throw new Error(err.message);
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticateUser,
};
