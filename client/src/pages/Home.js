import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { Divider } from "@mui/material";

import Navbar from "../components/Navbar";
import TopRestaurants from "../components/TopRestaurants";
import TrendingFoodItems from "../components/TrendingFoodItems";
import Signup from "../components/Signup";
import Login from "../components/Login";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackBar from "../components/FeedbackBar";

import axios from "../axios";

function Home() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TopRestaurants />
        </Grid>
        <Grid item xs={12}>
          <TrendingFoodItems />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
