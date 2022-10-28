const mongoose = require("mongoose");

const connect = (databaseConnectionString) => {
  return mongoose
    .connect(databaseConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Failed to connect to database!", err);
      process.exit();
    });
};

module.exports = {
  connect,
};