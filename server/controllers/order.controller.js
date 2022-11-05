const userRoles = require("../constants").userRoles;
const orderConstants = require("../constants").order;
const payment = require("../constants").payment;

const User = require("../models").user;
const Restaurant = require("../models").restaurant;
const Order = require("../models").order;

const placeOrder = async (req, res, next) => {
  try {
    const { customerId, restaurantId, billAmount, paymentType, items } =
      req.body;

    const customer = await User.findById(customerId);
    if (!customer) throw new Error("Customer with given Id not found");

    const orderDetails = {
      customer: customerId,
      restaurant: restaurantId,
      billAmount,
      orderStatus: order.CONFIRMED,
      paymentType,
      paymentStatus:
        paymentType === payment.paymentTypes.CASH_ON_DELIVERY
          ? payment.paymentStatus.UNPAID
          : payment.paymentStatus.PAID,
      items,
    };

    const createdOrder = await Order.create(orderDetails);

    return res
      .status(200)
      .json({ message: "Added Order Successfully", order: createdOrder });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, orderStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ message: "Order not found" });

    if (
      orderStatus === orderConstants.PREPARING ||
      orderStatus === orderConstants.OUT_FOR_DELIVERY
    )
      await Order.findByIdAndUpdate(orderId, { orderStatus });
    else throw new Error("Invalid order status");

    return res.status(200).json({
      message: "Updated Order Status Successfully",
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
};

const closeOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(400).json({ message: "Order not found" });

    await Order.findByIdAndUpdate(orderId, {
      orderStatus: orderConstants.COMPLETED,
      paymentStatus: payment.paymentStatus.PAID,
    });

    return res.status(200).json({ message: "Completed order successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  closeOrder,
};
