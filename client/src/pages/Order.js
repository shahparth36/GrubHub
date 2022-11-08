import React, { useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Divider, IconButton, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";

function Order() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const getItemsTotal = () => {
    let itemsTotal = 0;
    if (cart.items)
      for (const cartItem of cart.items) {
        const itemTotal = cartItem.pricePerQuantity * cartItem.quantity;
        itemsTotal += itemTotal;
      }
    return itemsTotal;
  };

  const getTaxesTotal = () => {
    return getItemsTotal() * (5 / 100);
  };

  const handleProceedToPayment = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (!cart.items) navigate("/");
  }, []);

  return !user.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div style={{ padding: "1rem" }}>
      <div style={{ paddingTop: "1rem", paddingBottom: "1.5rem" }}>
        <Card sx={{ minWidth: 275, borderRadius: "1rem" }}>
          <CardContent>
            <div style={{ display: "flex" }}>
              <LocationOnIcon style={{ fontSize: "1.2rem" }} />
              <Typography
                sx={{ fontSize: 15, marginLeft: "0.2rem" }}
                color="text.secondary"
                gutterBottom
              >
                Delivery at
              </Typography>
              <Typography
                sx={{ fontSize: 15, marginLeft: "0.2rem", fontWeight: "bold" }}
                color="text.primary"
                gutterBottom
              >
                &nbsp; {user.userDetails.address}
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
            {cart.items &&
              cart.items.map((cartItem, index) => {
                return (
                  <div key={index}>
                    <div style={{ display: "flex" }}>
                      <Typography style={{ fontWeight: "bold" }}>
                        {cartItem.name}
                      </Typography>
                      <Paper style={{ marginLeft: "auto", marginBottom: 0 }}>
                        <div style={{ display: "flex" }}>
                          <IconButton
                            size="small"
                            onClick={() => cart.removeItemFromCart(cartItem)}
                            color="inherit"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography style={{ padding: ".3rem" }}>
                            {cartItem.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => cart.addToCart(cartItem)}
                            color="inherit"
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </Paper>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{
                          fontSize: ".8rem",
                          fontWeight: "bold",
                          marginBottom: "1.5rem",
                        }}
                      >
                        &#8377; {cartItem.pricePerQuantity}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: ".8rem",
                          fontWeight: "bold",
                          marginLeft: "auto",
                          marginTop: ".5rem",
                          marginRight: ".2rem",
                        }}
                      >
                        &#8377; {cartItem.quantity * cartItem.pricePerQuantity}
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
      <div
        style={{ display: "flex", paddingTop: "0rem", justifyContent: "end" }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleProceedToPayment}
        >
          Proceed To Payment
        </Button>
      </div>
    </div>
  );
}

export default Order;
