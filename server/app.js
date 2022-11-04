require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const { errorHandler } = require("./middleware");
const { mongodb } = require("./config");

const authenticationRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const foodRoutes = require("./routes/food.routes");
const orderRoutes = require("./routes/order.routes");

mongodb.connect(process.env.MONGODB_URL);

app.use(express.static(path.join(__dirname, "/../client", "build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use("/api/auth", authenticationRoutes);
app.use("/api", userRoutes, restaurantRoutes, foodRoutes, orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
