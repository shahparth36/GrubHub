import React, { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
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
import { CartContext } from "../../context/cartContext";

function TrendingFoodItems() {
  const { cart } = useContext(CartContext);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/food");
        const foodItems = response.data.foodItems;
        setFoodItems(foodItems);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Grid container spacing={2} style={{ marginBottom: 20 }}>
      <Grid item xs={12} style={{ marginLeft: 25 }}>
        <h1 style={{ fontFamily: "Roboto", fontWeight: 100 }}>
          Trending Dishes
        </h1>
      </Grid>
      {foodItems.length > 0 &&
        foodItems.map((foodItem, index) => {
          return (
            <Grid key={index} item xs={4}>
              <Card sx={{ maxWidth: 360, marginLeft: 3 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt="Paella dish"
                />
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      style={{
                        fontSize: "1.2rem",
                        paddingLeft: "1rem",
                        paddingTop: "1rem",
                        paddingBottom: ".5rem",
                      }}
                    >
                      {foodItem.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ display: "flex", marginTop: "1.1rem" }}>
                      <Button
                        color="primary"
                        onClick={() => cart.addToCart(foodItem)}
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: "flex", marginBottom: "0.2rem" }}>
                      <LocationOnIcon
                        style={{ fontSize: "1.2rem", marginLeft: 10 }}
                      />
                      <Typography style={{ fontSize: ".9rem" }}>
                        {foodItem.restaurant.name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                    <Typography style={{ fontSize: ".9rem", marginLeft: 18 }}>
                      &#8377; {foodItem.pricePerQuantity}
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

export default TrendingFoodItems;
