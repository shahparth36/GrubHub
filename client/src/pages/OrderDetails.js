import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Chip, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import axios from "../axios";

import LoadingSpinner from "../components/LoadingSpinner";

function OrderDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getItemsTotal = () => {
    let itemsTotal = 0;
    if (order.items)
      for (const orderItem of order.items) {
        const itemTotal =
          orderItem.foodId.pricePerQuantity * orderItem.quantity;
        itemsTotal += itemTotal;
      }
    return itemsTotal;
  };

  const getTaxesTotal = () => {
    return getItemsTotal() * (5 / 100);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/order/${params.orderId}`);
        setOrder(response.data.order);
        setIsLoading(false);
      } catch (error) {
        if (error.response) navigate("/");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      style={{ backgroundColor: "#EAEAEA", height: "100%", padding: "1rem" }}
    >
      <div style={{ paddingTop: "0rem", paddingBottom: "1rem" }}>
        <Card sx={{ minWidth: 455, borderRadius: "1rem" }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography
                sx={{ fontSize: 18, marginLeft: "0.2rem", fontWeight: "bold" }}
                gutterBottom
              >
                Order Details
              </Typography>
            </div>
            <Divider />
            <div style={{ padding: "1rem", paddingLeft: ".2rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>ORDER STATUS</Typography>
              <Typography>{order && order.orderStatus}</Typography>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>RESTAURANT</Typography>
              <Typography>
                {order.restaurant && order.restaurant.name}
              </Typography>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>PAYMENT</Typography>
              <Typography>
                {order && order.paymentType === "CASH_ON_DELIVERY"
                  ? "Cash on delivery"
                  : "Online"}
              </Typography>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>ORDER DATE</Typography>
              <Typography>
                {order && new Date(order.createdAt).toDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </Typography>
            </div>
            <div style={{ paddingBottom: "1rem" }}>
              <Typography sx={{ fontWeight: "bold" }}>DELIVER TO</Typography>
              <Typography>
                {order.customer && order.customer.address}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ paddingTop: "0rem", paddingBottom: "1.5rem" }}>
        <Card sx={{ minWidth: 455, borderRadius: "1rem" }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography
                sx={{ fontSize: 18, marginLeft: "0.2rem", fontWeight: "bold" }}
                gutterBottom
              >
                Your Order
              </Typography>
            </div>
            <Divider style={{ marginBottom: "1rem" }} />
            {order.items &&
              order.items.map((orderItem, index) => {
                const item = orderItem.foodId;
                return (
                  <div key={index}>
                    <div style={{ display: "flex" }}>
                      <Typography style={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          marginLeft: "auto",
                          marginTop: ".5rem",
                          marginRight: ".2rem",
                        }}
                      >
                        &#8377; {orderItem.quantity * item.pricePerQuantity}
                      </Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Chip
                        style={{ marginRight: ".5rem" }}
                        label={orderItem.quantity}
                      />
                      <Typography>x</Typography>
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          marginBottom: "1.5rem",
                          marginLeft: ".5rem",
                          marginTop: ".1rem",
                        }}
                      >
                        &#8377; {item.pricePerQuantity}
                      </Typography>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
      <div style={{ paddingTop: "0rem", paddingBottom: "1rem" }}>
        <Card sx={{ minWidth: 455, borderRadius: "1rem" }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography
                sx={{ fontSize: 18, marginLeft: "0.2rem", fontWeight: "bold" }}
                gutterBottom
              >
                Bill Summary
              </Typography>
            </div>
            <Divider />
            <div
              style={{ display: "flex", padding: ".5rem", paddingBottom: 0 }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                Item total
              </Typography>
              <Typography
                sx={{ fontSize: 15, marginLeft: "auto", fontWeight: "bold" }}
                gutterBottom
              >
                &#8377; {getItemsTotal()}
              </Typography>
            </div>
            <div style={{ display: "flex", padding: ".5rem" }}>
              <Typography sx={{ fontSize: 15 }}>Govt. taxes</Typography>
              <Typography
                sx={{ fontSize: 15, marginLeft: "auto" }}
                gutterBottom
              >
                &#8377; {getTaxesTotal()}
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", paddingTop: ".5rem" }}>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                Grand Total
              </Typography>
              <Typography
                sx={{ fontSize: 18, marginLeft: "auto", fontWeight: "bold" }}
                gutterBottom
              >
                &#8377; {getItemsTotal() + getTaxesTotal()}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetails;
