const createRestaurantModel = (mongoose) => {
  const restaurantSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      contactNo: { type: Number, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      managers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
      timestamps: true,
    }
  );

  const Restaurant = mongoose.model("Restaurant", restaurantSchema);
  return Restaurant;
};

module.exports = createRestaurantModel;
