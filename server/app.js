require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const { errorHandler } = require("./middleware");
const { mongodb } = require("./config");

mongodb.connect(process.env.MONGODB_URL);

app.use(express.static(path.join(__dirname, "/../client", "build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});