const createOrderModel = (mongoose) => {
  const orderSchema = new mongoose.Schema(
    {
      customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
      deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      billAmount: { type: Number },
      orderStatus: { type: String },
      paymentType: { type: String },
      paymentStatus: { type: String },
      items: [
        {
          foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
          quantity: { type: Number },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  const Order = mongoose.model("Order", orderSchema);
  return Order;
};

module.exports = createOrderModel;
