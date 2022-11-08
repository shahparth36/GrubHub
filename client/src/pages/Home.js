import React from "react";

import { Grid } from "@mui/material";

import TopRestaurants from "../components/TopRestaurants";
import TrendingFoodItems from "../components/TrendingFoodItems";

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
