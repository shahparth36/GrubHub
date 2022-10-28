const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const saltRounds = 8;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

const verifyPassword = (plainTextPassword, hashedPassword) => {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  verifyPassword,
};