const createReservationModel = (mongoose) => {
  const reservationSchema = new mongoose.Schema(
    {
      restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
      customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      noOfGuests: { type: Number, required: true },
      session: { type: String, required: true },
      date: { type: Date, required: true },
    },
    {
      timestamps: true,
    }
  );

  const Reservation = mongoose.model("Reservation", reservationSchema);
  return Reservation;
};

module.exports = createReservationModel;
