const { default: mongoose } = require("mongoose");

const Reservation = require("../models").reservation;
const User = require("../models").user;
const Table = require("../models").table;
const Restaurant = require("../models").restaurant;

const addReservation = async (req, res, next) => {
  try {
    const { restaurantId, customerId, noOfGuests, session, date } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("Restaurant with given id does not exist");

    const customer = await User.findById(customerId);
    if (!customer) throw new Error("Customer with given id does not exist");

    if (new Date(date).getTime() < new Date().getTime())
      throw new Error("Please enter a valid reservation date");

    const reservations = await Reservation.find({ customer: customerId });

    for (const reservation of reservations) {
      const reservedDateTime = new Date(reservation.reservationDateTime);
      const reservationDateTime1 = new Date(date);
      if (
        reservedDateTime.getFullYear() === reservationDateTime1.getFullYear() &&
        reservedDateTime.getMonth() === reservationDateTime1.getMonth() &&
        reservedDateTime.getDate() === reservationDateTime1.getDate()
      )
        throw new Error("You cannot make 2 bookings on same day");
    }

    const reservationDetails = {
      restaurant: restaurantId,
      customer: customerId,
      noOfGuests,
      session,
      date: new Date(date),
    };

    const createdReservation = await Reservation.create(reservationDetails);

    return res.status(200).json({
      message: "Added reservation successfully",
      reservation: createdReservation,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerReservations = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await User.findById(customerId);
    if (!customer) throw new Error("Customer with given id not found");

    const customerReservations = await Reservation.find({
      customer: customer._id,
    })
      .populate("restaurant")
      .populate("customer");

    return res.status(200).json({
      message: "Fetched customer reservations successfully",
      reservations: customerReservations,
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurantReservations = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("Customer with given id not found");

    const restaurantReservations = await Reservation.find({
      restaurant: restaurantId,
    })
      .populate("customer")
      .populate("restaurant");

    return res.status(200).json({
      message: "Fetched restaurant reservations successfully",
      reservations: restaurantReservations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReservation,
  getCustomerReservations,
  getRestaurantReservations,
};
