const User = require("../models").user;

const { generateToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) throw new Error("User with given email does not exist");

    const passwordValid = verifyPassword(password, userExists.password);
    if (!passwordValid) throw new Error("Password does not match");

    const payload = {
      email: userExists.email,
      role: userExists.role,
    };

    generateToken(payload)
      .then(function (token) {
        return res.status(200).json({
          message: "Authenticated user successfully",
          accessToken: token,
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
