import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import TopRestaurants from "../components/TopRestaurants";
import TrendingFoodItems from "../components/TrendingFoodItems";

import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackBar from "../components/FeedbackBar";

import axios from "../axios";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const restaurantResponse = await axios.get("/restaurants");
        const restaurants = restaurantResponse.data.restaurants;
        setRestaurants(restaurants.slice(0, 3));

        const foodItemsResponse = await axios.get("/food");
        const foodItems = foodItemsResponse.data.foodItems;
        setFoodItems(foodItems);

        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.data.error) {
          setFeedbackbar({
            isOpen: true,
            message: error.response.data.error,
            severity: "error",
          });
        } else {
          setFeedbackbar({
            isOpen: true,
            message: "Something went wrong.",
            severity: "error",
          });
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FeedbackBar
            feedbackbar={feedbackbar}
            closeFeedbackbar={closeFeedbackbar}
          />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TopRestaurants restaurants={restaurants} />
            </Grid>
            <Grid item xs={12}>
              <TrendingFoodItems foodItems={foodItems} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default Home;
