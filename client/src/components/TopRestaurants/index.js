import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import axios from "../../axios";

function TopRestaurants() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  const handleClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/restaurants");
      const restaurants = response.data.restaurants;
      setRestaurants(restaurants.slice(0, 3));
    }
    fetchData();
  }, []);

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
