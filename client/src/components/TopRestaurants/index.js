import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import axios from "../../axios";

function TopRestaurants({ restaurants }) {
  const navigate = useNavigate();

  const handleClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ marginLeft: 25 }}>
        <h1 style={{ fontFamily: "Roboto", fontWeight: 100 }}>
          Top Restaurants Near You
        </h1>
      </Grid>
      {restaurants.length > 0 &&
        restaurants.map((restaurant, index) => {
          return (
            <Grid key={index} item xs={3} style={{ marginLeft: 25 }}>
              <Card
                onClick={() => handleClick(restaurant._id)}
                sx={{ maxWidth: 360, cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt="Paella dish"
                />
                <Grid container>
                  <Grid item xs={9}>
                    <Typography
                      style={{
                        fontSize: "1.2rem",
                        paddingLeft: "1rem",
                        paddingTop: "1rem",
                        paddingBottom: ".5rem",
                      }}
                    >
                      {restaurant.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default TopRestaurants;
