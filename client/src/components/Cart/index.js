import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton, Paper } from "@mui/material";
import TextField from "@mui/joy/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import axios from "../../axios";
import { setToken } from "../../utils/localStorage";
import { UserContext } from "../../context/userContext";

function Cart({ address, isCartModalOpen, cart, closeModal, setFeedbackbar }) {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const handleClose = () => {
    closeModal("CART");
  };

  const getItemsTotal = () => {
    let itemsTotal = 0;
    if (cart.items) {
      for (const cartItem of cart.items) {
        const itemTotal = cartItem.pricePerQuantity * cartItem.quantity;
        itemsTotal += itemTotal;
      }
    }
    return itemsTotal;
  };

  const handleProceed = () => {
    closeModal("CART");
    if (!user.isAuthenticated)
      setFeedbackbar({
        isOpen: true,
        message: "Please login to proceed ahead",
        severity: "error",
      });
    else {
      navigate("/order");
    }
  };

  return (
    <Dialog
      open={isCartModalOpen}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth={true}
    >
      <div style={{ backgroundColor: "#EAEAEA", paddingBottom: ".5rem" }}>
        <div style={{ display: "flex" }}>
          <DialogTitle>{"Cart"}</DialogTitle>
          <IconButton
            size="medium"
            onClick={() => closeModal("CART")}
            color="inherit"
            style={{ marginLeft: "auto", marginRight: "1rem" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent style={{ paddingTop: "0rem", paddingBottom: "1rem" }}>
          <Card sx={{ minWidth: 455, borderRadius: "1rem" }}>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    marginLeft: "0.2rem",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                >
                  Your Order
                </Typography>
              </div>
              {cart.items && <Divider style={{ marginBottom: "1rem" }} />}
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
                          &#8377;{" "}
                          {cartItem.quantity * cartItem.pricePerQuantity}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              <Divider />
              <div style={{ display: "flex", marginTop: "1rem" }}>
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                  Item total
                </Typography>
                <Typography
                  sx={{ fontSize: 18, marginLeft: "auto", fontWeight: "bold" }}
                  gutterBottom
                >
                  &#8377; {getItemsTotal()}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions style={{ paddingTop: "0rem", marginRight: "1rem" }}>
          <Button
            color="error"
            variant="contained"
            onClick={handleProceed}
            disabled={cart.items === null}
          >
            Proceed
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default Cart;
