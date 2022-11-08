import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Link, Typography } from "@mui/material";

import axios from "../../axios";

import LoadingSpinner from "../LoadingSpinner";
import FeedbackBar from "../FeedbackBar";
import UpdateOrder from "../Restaurant/UpdateOrder";
import DishItems from "../DishItems";

import RestaurantInfo from "./RestaurantInfo";
import CustomerInfo from "./CustomerInfo";

import { UserContext } from "../../context/userContext";

function getPaymentType(paymentType) {
  return paymentType === "CASH_ON_DELIVERY" ? "Cash On Delivery" : "Online";
}

function getOrderStatus(orderStatus) {
  let result = orderStatus;
  if (orderStatus === "CONFIRMED") result = "Confirmed";
  else if (orderStatus === "PREPARING") result = "Preparing";
  else if (orderStatus === "OUT_FOR_DELIVERY") result = "Out For Delivery";
  else if (orderStatus === "COMPLETED") result = "Completed";
  return result;
}

function getPaymentStatus(paymentStatus) {
  return paymentStatus === "PAID" ? "Paid" : "Unpaid";
}

function Orders() {
  const { user } = useContext(UserContext);

  const [ongoingOrders, setOngoingOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateOrderModalOpen, setIsUpdateOrderModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);

  const [index, setIndex] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const closeFeedbackbar = () => {
    setFeedbackbar({
      isOpen: false,
      message: "",
      severity: "",
    });
  };

  const handleViewClose = () => setIsViewModalOpen(false);

  const handleUpdateOrderClose = () => setIsUpdateOrderModalOpen(false);

  const handleViewClick = (index) => {
    setIndex(index);
    setIsViewModalOpen(true);
  };

  const handleUpdateOrderClick = (index) => {
    setIndex(index);
    setIsUpdateOrderModalOpen(true);
  };

  const handleUpdate = async (order, newOrderStatus) => {
    try {
      setIsLoading(true);
      let formattedOrderStatus = newOrderStatus.toUpperCase();
      if (newOrderStatus === "Out For Delivery")
        formattedOrderStatus = "OUT_FOR_DELIVERY";
      const orderDetails = {
        orderId: order._id,
        orderStatus: formattedOrderStatus,
      };
      if (formattedOrderStatus === "COMPLETED") {
        await axios.post("/close-order", { orderId: order._id });
        setFeedbackbar({
          isOpen: true,
          message: "Completed order successfully",
          severity: "success",
        });
      } else {
        await axios.put("/order-status", orderDetails);
        setFeedbackbar({
          isOpen: true,
          message: "Updated order successfully",
          severity: "success",
        });
      }
      handleUpdateOrderClose();
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setFeedbackbar({
          isOpen: true,
          message: error.response.data.error,
          severity: "error",
        });
      } else
        setFeedbackbar({
          isOpen: true,
          message: "Something went wrong",
          severity: "error",
        });
      setIsLoading(false);
    }
  };

  const handleAccept = async (order) => {
    try {
      setIsLoading(true);
      const orderDetails = {
        orderId: order._id,
        deliveryAgentId: user.userDetails._id,
      };
      await axios.put("/order/accept", orderDetails);
      setFeedbackbar({
        isOpen: true,
        message: "Accepted order successfully",
        severity: "success",
      });
      setRefresh(true);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setFeedbackbar({
          isOpen: true,
          message: error.response.data.error,
          severity: "error",
        });
      } else
        setFeedbackbar({
          isOpen: true,
          message: "Something went wrong",
          severity: "error",
        });
      setIsLoading(false);
    }
  };

  const handleCustomerClick = (index) => {
    setIndex(index);
    setIsCustomerModalOpen(true);
  };

  const handleRestaurantClick = (index) => {
    setIndex(index);
    setIsRestaurantModalOpen(true);
  };

  const handleRestaurantClose = () => setIsRestaurantModalOpen(false);

  const handleCustomerClose = () => setIsCustomerModalOpen(false);

  function hasAnAcceptedOrder() {
    for (const order of ongoingOrders) {
      if (
        order.deliveryAgent &&
        order.deliveryAgent._id === user.userDetails._id
      )
        return true;
    }
    return false;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const orderResponse = await axios.get(`/orders/ongoing`);
        setOngoingOrders(orderResponse.data.orders);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.data.error)
          setFeedbackbar({
            isOpen: true,
            message: error.response.data.error,
            severity: "error",
          });
        else
          setFeedbackbar({
            isOpen: true,
            message: "Something went wrong.",
            severity: "error",
          });
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isUpdateOrderModalOpen, refresh]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FeedbackBar
            feedbackbar={feedbackbar}
            closeFeedbackbar={closeFeedbackbar}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "1rem",
            }}
          >
            <DishItems
              isOpen={isViewModalOpen}
              handleClose={handleViewClose}
              items={ongoingOrders.length > 0 ? ongoingOrders[index].items : []}
            />
            <UpdateOrder
              isOpen={isUpdateOrderModalOpen}
              handleClose={handleUpdateOrderClose}
              order={ongoingOrders.length > 0 ? ongoingOrders[index] : {}}
              handleUpdate={handleUpdate}
              role="DELIVERY_AGENT"
            />
            <RestaurantInfo
              isOpen={isRestaurantModalOpen}
              handleClose={handleRestaurantClose}
              restaurant={
                ongoingOrders.length > 0 ? ongoingOrders[index].restaurant : {}
              }
            />
            <CustomerInfo
              isOpen={isCustomerModalOpen}
              handleClose={handleCustomerClose}
              customer={
                ongoingOrders.length > 0 ? ongoingOrders[index].customer : {}
              }
            />
            <Typography
              sx={{
                fontSize: 36,
                alignSelf: "center",
                fontWeight: "light",
                padding: "3rem",
              }}
            >
              Ongoing Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer</TableCell>
                    <TableCell align="center">Restaurant</TableCell>
                    <TableCell align="center">Grand Total</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Payment Type</TableCell>
                    <TableCell align="center">Payment Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ongoingOrders.length > 0 &&
                    ongoingOrders.map((ongoingOrder, index) => {
                      let hasDeliveryAgentAcceptedOrder = false;
                      if (ongoingOrder.deliveryAgent && user.userDetails) {
                        hasDeliveryAgentAcceptedOrder =
                          ongoingOrder.deliveryAgent._id ===
                          user.userDetails._id
                            ? true
                            : false;
                      }
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#9c27b0",
                                cursor: "pointer",
                              }}
                              onClick={() => handleCustomerClick(index)}
                            >
                              {ongoingOrder.customer.name}
                            </Link>
                          </TableCell>
                          <TableCell
                            style={{
                              textDecoration: "none",
                              color: "#9c27b0",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRestaurantClick(index)}
                            align="center"
                          >
                            {ongoingOrder.restaurant.name}
                          </TableCell>
                          <TableCell align="center">
                            &#8377; {ongoingOrder.grandTotal}
                          </TableCell>
                          <TableCell align="center">
                            {getOrderStatus(ongoingOrder.orderStatus)}
                          </TableCell>
                          <TableCell align="center">
                            {getPaymentType(ongoingOrder.paymentType)}
                          </TableCell>
                          <TableCell align="center">
                            {getPaymentStatus(ongoingOrder.paymentStatus)}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              color="secondary"
                              variant="outlined"
                              onClick={() => handleViewClick(index)}
                            >
                              View Items
                            </Button>
                            {hasDeliveryAgentAcceptedOrder ? (
                              <Button
                                size="small"
                                style={{ marginLeft: "1rem" }}
                                color="secondary"
                                variant="outlined"
                                onClick={() => handleUpdateOrderClick(index)}
                              >
                                Update Order
                              </Button>
                            ) : (
                              <Button
                                disabled={hasAnAcceptedOrder()}
                                size="small"
                                style={{ marginLeft: "1rem" }}
                                color="secondary"
                                variant="outlined"
                                onClick={() => handleAccept(ongoingOrder)}
                              >
                                Accept
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
