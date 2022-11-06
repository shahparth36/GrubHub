import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton, Paper } from "@mui/material";
import TextField from "@mui/joy/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/Checkout/AddressForm";
import PaymentForm from "../components/Checkout/PaymentForm";
import Review from "../components/Checkout/Review";

import axios from "../axios";
import { setToken } from "../utils/localStorage";

import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import FeedbackBar from "../components/FeedbackBar";

const steps = ["Delivery address", "Review your order", "Payment details"];

function Checkout() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  const [activeStep, setActiveStep] = React.useState(0);

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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getItemsTotal = () => {
    const cart = JSON.parse(window.localStorage.getItem("ghcart"));
    let itemsTotal = 0;
    for (const cartItem of cart) {
      const itemTotal = cartItem.pricePerQuantity * cartItem.quantity;
      itemsTotal += itemTotal;
    }
    return itemsTotal;
  };

  const getTaxesTotal = () => {
    return getItemsTotal() * (5 / 100);
  };

  const placeOrder = async (paymentType) => {
    try {
      let localCart = JSON.parse(window.localStorage.getItem("ghcart"));
      localCart = localCart.map((cartItem, index) => {
        return {
          ...cartItem,
          foodId: cartItem._id,
        };
      });
      const orderDetails = {
        customerId: user.userDetails._id,
        restaurantId: localCart[0].restaurant._id,
        paymentType,
        items: localCart,
        billAmount: getItemsTotal(),
        governmentTaxes: getTaxesTotal(),
        grandTotal: getItemsTotal() + getTaxesTotal(),
      };
      const response = await axios.post("/order", orderDetails);
      cart.clearCart();
      setFeedbackbar({
        isOpen: true,
        message: "Placed order successfully",
        severity: "success",
      });
      setCart({
        ...cart,
        items: [],
      });
      setTimeout(() => {
        navigate(`/order/${response.data.order._id}`);
      }, 5000);
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
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm address={user.userDetails.address} />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm placeOrder={placeOrder} />;
      default:
        throw new Error("Unknown step");
    }
  };

  useEffect(() => {
    if (!cart.items) navigate("/");
  }, []);

  return !user.isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <FeedbackBar
        feedbackbar={feedbackbar}
        closeFeedbackbar={closeFeedbackbar}
      />
      <div style={{ padding: "1rem" }}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
}

export default Checkout;
