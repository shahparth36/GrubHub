import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

import axios from "../../axios";

import LoadingSpinner from "../LoadingSpinner";
import FeedbackBar from "../FeedbackBar";
import { UserContext } from "../../context/userContext";
import UpdateOrder from "./UpdateOrder";
import DishItems from "../DishItems";

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

  const [restaurantOrders, setRestaurantOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateOrderModalOpen, setIsUpdateOrderModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
      await axios.put("/order-status", orderDetails);
      setFeedbackbar({
        isOpen: true,
        message: "Updated order successfully",
        severity: "success",
      });
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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let restaurantId;
        if (!user.managers) restaurantId = user.userDetails._id;
        else {
          const response = await axios.get(
            `/restaurant/manager/${user.userDetails._id}`
          );
          restaurantId = response.data.restaurant._id;
        }

        const orderResponse = await axios.get(
          `/order/restaurant/${restaurantId}`
        );
        setRestaurantOrders(orderResponse.data.orders);
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
  }, [isUpdateOrderModalOpen]);

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
              items={
                restaurantOrders.length > 0 ? restaurantOrders[index].items : []
              }
            />
            <UpdateOrder
              isOpen={isUpdateOrderModalOpen}
              handleClose={handleUpdateOrderClose}
              order={restaurantOrders.length > 0 ? restaurantOrders[index] : {}}
              handleUpdate={handleUpdate}
            />
            <Typography
              sx={{
                fontSize: 36,
                alignSelf: "center",
                fontWeight: "light",
                padding: "3rem",
              }}
            >
              Your orders for the day
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Grand Total</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Payment Type</TableCell>
                    <TableCell align="center">Payment Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurantOrders.map((restaurantOrder, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {restaurantOrder.customer.name}
                      </TableCell>
                      <TableCell align="center">
                        &#8377; {restaurantOrder.grandTotal}
                      </TableCell>
                      <TableCell align="center">
                        {getOrderStatus(restaurantOrder.orderStatus)}
                      </TableCell>
                      <TableCell align="center">
                        {getPaymentType(restaurantOrder.paymentType)}
                      </TableCell>
                      <TableCell align="center">
                        {getPaymentStatus(restaurantOrder.paymentStatus)}
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
                        <Button
                          disabled={restaurantOrder.orderStatus === "COMPLETED"}
                          size="small"
                          style={{ marginLeft: "1rem" }}
                          color="secondary"
                          variant="outlined"
                          onClick={() => handleUpdateOrderClick(index)}
                        >
                          Update Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
