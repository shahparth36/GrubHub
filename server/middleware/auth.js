const { tokens } = require("../constants");

const User = require("../models").user;
const Restaurant = require("../models").restaurant;

const { getToken, verifyToken } = require("../utils");

const authorize = async (req, res, next) => {
  const token = getToken(req);

  if (!token)
    return res.status(403).json({
      type: "UnauthorizedError",
      message: "Access denied. No token provided.",
    });

  try {
    const verifiedToken = await verifyToken(token, tokens.ACCESS_TOKEN);

    if (!verifiedToken)
      return res
        .status(403)
        .json({ type: "UnauthorizedError", message: "Invalid JWT token" });

    let user = await User.findOne({ email: verifiedToken.email });
    if (!user) user = await Restaurant.findOne({ email: verifiedToken.email });
    req.user = user;
    next();
  } catch (e) {
    return res
      .status(403)
      .json({ type: "UnauthorizedError", message: "Invalid JWT token" });
  }
};

module.exports = authorize;
