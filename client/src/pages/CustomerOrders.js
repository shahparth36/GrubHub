import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

import LoadingSpinner from "../components/LoadingSpinner";
import DishItems from "../components/DishItems";

import axios from "../axios";

import { UserContext } from "../context/userContext";

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

function CustomerOrders() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleViewClose = () => setIsViewModalOpen(false);

  const handleViewClick = (index) => {
    setIndex(index);
    setIsViewModalOpen(true);
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (!user.isAuthenticated) navigate("/");
        const response = await axios.get(`/orders/customer`);
        setOrders(response.data.orders);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <DishItems
        isOpen={isViewModalOpen}
        handleClose={handleViewClose}
        items={orders.length > 0 ? orders[index].items : []}
      />
      <Typography sx={{ fontSize: 36, fontWeight: "Light", padding: "2rem" }}>
        Your Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Restaurant</TableCell>
              <TableCell align="center">Grand Total</TableCell>
              <TableCell align="center">Order Status</TableCell>
              <TableCell align="center">Payment Type</TableCell>
              <TableCell align="center">Payment Status</TableCell>
              <TableCell align="center">Delivery Agent</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <Typography style={{ padding: "1rem" }}>
                No Orders Found!
              </Typography>
            ) : (
              orders.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleOrderClick(order._id)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "rgb(224, 224, 224)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {order && order.restaurant && order.restaurant.name}
                  </TableCell>
                  <TableCell align="center">
                    &#8377; {order.grandTotal}
                  </TableCell>
                  <TableCell align="center">
                    {getOrderStatus(order.orderStatus)}
                  </TableCell>
                  <TableCell align="center">
                    {getPaymentType(order.paymentType)}
                  </TableCell>
                  <TableCell align="center">
                    {getPaymentStatus(order.paymentStatus)}
                  </TableCell>
                  <TableCell align="center">
                    {!order.deliveryAgent ? "-" : order.deliveryAgent.name}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(order.createdAt).toDateString().toString()}
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomerOrders;
