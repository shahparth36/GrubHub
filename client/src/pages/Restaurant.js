import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import axios from "../axios";
import FeedbackBar from "../components/FeedbackBar";
import LoadingSpinner from "../components/LoadingSpinner";
import styled from "@emotion/styled";
import { CartContext } from "../context/cartContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ItemDisplay = styled("div")(({ theme }) => ({
  padding: "1rem",
  paddingTop: "1rem",
  width: "100%",
}));

const CustomCard = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: 100,
}));

function Restaurant() {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  const navigate = useNavigate();
  const params = useParams();

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [restaurant, setRestaurant] = useState({});
  const [value, setValue] = React.useState(0);
  const [itemsValue, setItemsValue] = React.useState(0);
  const [currentCategory, setCurrentCategory] = React.useState("");

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleItemsValueChange = (event, newValue) => {
    setCurrentCategory(Object.entries(restaurant.categories)[newValue][0]);
    setItemsValue(newValue);
  };

  const closeFeedbackbar = () => {
    setFeedbackbar({
      isOpen: false,
      message: "",
      severity: "",
    });
  };

  const isItemInCart = (dish) => {
    const obj = {
      result: false,
      quantity: 0,
    };
    const cartItems = JSON.parse(window.localStorage.getItem("ghcart"));
    for (const cartItem of cartItems) {
      if (cartItem._id === dish._id) {
        obj.result = true;
        obj.quantity = cartItem.quantity;
      }
    }
    return obj;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/restaurant/${params.restaurantId}`);
        setCurrentCategory(
          response.data.restaurant.dishes.length > 0
            ? response.data.restaurant.dishes[0].category
            : ""
        );
        setRestaurant(response.data.restaurant);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <FeedbackBar
        feedbackbar={feedbackbar}
        closeFeedbackbar={closeFeedbackbar}
      />
      <div>
        <Container maxWidth="xl" style={{ padding: 0 }}>
          <Grid
            container
            style={{
              backgroundColor: "#1976d2",
              marginTop: "2rem",
              padding: "2rem",
            }}
          >
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 250, height: 150 }}
                  image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt="Live from space album cover"
                />
              </div>
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "1rem", marginTop: "2rem" }}>
              <Typography
                sx={{ fontSize: 32, fontWeight: "light", color: "white" }}
              >
                {restaurant.name}
              </Typography>
              <div style={{ display: "flex", marginBottom: "0.2rem" }}>
                <LocationOnIcon
                  style={{
                    fontSize: "1.2rem",
                    color: "white",
                    marginTop: ".3rem",
                  }}
                />
                <Typography
                  sx={{ fontSize: 16, color: "white", margin: ".2rem" }}
                >
                  {restaurant.address}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleValueChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Order Online" />
                <Tab label="Table Reservations" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={itemsValue}
                  onChange={handleItemsValueChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  {restaurant.categories &&
                    Object.entries(restaurant.categories).map(
                      ([category], index) => {
                        return <Tab key={index} label={`${category}`} />;
                      }
                    )}
                </Tabs>
                {restaurant.categories &&
                  Object.entries(restaurant.categories).map(
                    ([a, b], categoryIndex) => {
                      return (
                        <TabPanel value={itemsValue} index={categoryIndex}>
                          {restaurant.dishes &&
                            restaurant.dishes.map((dish, index) => {
                              if (dish.category === currentCategory)
                                return (
                                  <ItemDisplay key={index}>
                                    <CustomCard variant="outlined">
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <CardMedia
                                          component="img"
                                          sx={{ width: 120 }}
                                          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
                                          alt="Live from space album cover"
                                        />
                                        <Paper style={{ marginBottom: 0 }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            {isItemInCart(dish).result ? (
                                              <>
                                                <IconButton
                                                  size="small"
                                                  onClick={() =>
                                                    cart.removeItemFromCart(
                                                      dish
                                                    )
                                                  }
                                                  color="secondary"
                                                >
                                                  <RemoveIcon />
                                                </IconButton>
                                                <Typography
                                                  style={{ padding: ".5rem" }}
                                                  color="secondary"
                                                >
                                                  {isItemInCart(dish).quantity}
                                                </Typography>
                                                <IconButton
                                                  size="small"
                                                  onClick={() =>
                                                    cart.addToCart(dish)
                                                  }
                                                  color="secondary"
                                                >
                                                  <AddIcon />
                                                </IconButton>
                                              </>
                                            ) : (
                                              <Button
                                                onClick={() =>
                                                  cart.addToCart(dish)
                                                }
                                                style={{
                                                  backgroundColor: "white",
                                                  color: "Purple",
                                                }}
                                              >
                                                Add
                                              </Button>
                                            )}
                                          </div>
                                        </Paper>
                                      </div>
                                      <Box sx={{ display: "flex" }}>
                                        <CardContent sx={{ flex: "1 0 auto" }}>
                                          <div style={{ display: "flex" }}>
                                            <Typography>{dish.name}</Typography>
                                          </div>
                                          <Typography color="text.secondary">
                                            &#8377; {dish.pricePerQuantity}
                                          </Typography>
                                        </CardContent>
                                      </Box>
                                    </CustomCard>
                                  </ItemDisplay>
                                );
                            })}
                        </TabPanel>
                      );
                    }
                  )}
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default Restaurant;
