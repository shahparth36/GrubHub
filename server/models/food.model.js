const createFoodModel = (mongoose) => {
  const foodSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      pricePerQuantity: { type: Number, required: true },
      category: { type: String },
      restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    },
    {
      timestamps: true,
    }
  );

  const Food = mongoose.model("Food", foodSchema);
  return Food;
};

module.exports = createFoodModel;
