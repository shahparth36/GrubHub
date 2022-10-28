const mongoose = require("mongoose");

const models = {};
models.user = require("./user.model.js")(mongoose);

module.exports = models;