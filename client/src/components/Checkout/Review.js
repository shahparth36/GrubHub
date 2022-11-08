import * as React from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Divider, IconButton, Paper } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";

export default function Review() {
  const { user } = React.useContext(UserContext);
  const { cart } = React.useContext(CartContext);

  const getItemsTotal = () => {
    let itemsTotal = 0;
    for (const cartItem of cart.items) {
      const itemTotal = cartItem.pricePerQuantity * cartItem.quantity;
      itemsTotal += itemTotal;
    }
    return itemsTotal;
  };

  const getTaxesTotal = () => {
    return getItemsTotal() * (5 / 100);
  };

  const getGrandTotal = () => {
    return getItemsTotal() + getTaxesTotal();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.items.map((cartItem, index) => (
          <div key={index}>
            <div style={{ display: "flex", padding: ".5rem" }}>
              <Typography sx={{ fontSize: 16 }}>{cartItem.name}</Typography>
              <Paper
                style={{
                  marginLeft: "auto",
                  marginBottom: 0,
                  marginRight: "2rem",
                }}
              >
                <div style={{ display: "flex" }}>
                  <IconButton size="small" disabled={true} color="inherit">
                    <RemoveIcon />
                  </IconButton>
                  <Typography style={{ padding: ".3rem" }}>
                    {cartItem.quantity}
                  </Typography>
                  <IconButton size="small" disabled={true} color="inherit">
                    <AddIcon />
                  </IconButton>
                </div>
              </Paper>
              <Typography
                sx={{
                  fontSize: 15,
                  paddingRight: ".5rem",
                  paddingTop: ".7rem",
                  fontWeight: "bold",
                }}
                gutterBottom
              >
                &#8377; {cartItem.quantity * cartItem.pricePerQuantity}
              </Typography>
            </div>
            <Typography
              style={{
                fontSize: 15,
                marginLeft: ".6rem",
                fontWeight: "bold",
                marginBottom: ".5rem",
              }}
            >
              &#8377; {cartItem.pricePerQuantity}
            </Typography>
          </div>
        ))}

        <Divider style={{ paddingTop: ".8rem" }} />
        <div style={{ padding: ".5rem" }}>
          <div
            style={{ display: "flex", paddingTop: ".7rem", paddingBottom: 0 }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              Item total
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                marginLeft: "auto",
                marginRight: ".5rem",
                fontWeight: "bold",
              }}
              gutterBottom
            >
              &#8377; {getItemsTotal()}
            </Typography>
          </div>
          <div style={{ display: "flex", paddingTop: ".7rem" }}>
            <Typography sx={{ fontSize: 16 }}>Govt. taxes</Typography>
            <Typography
              sx={{ fontSize: 15, marginRight: ".5rem", marginLeft: "auto" }}
              gutterBottom
            >
              &#8377; {getTaxesTotal()}
            </Typography>
          </div>
        </div>
        <Divider />
        <div style={{ display: "flex", paddingTop: "1rem" }}>
          <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
            Grand Total
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              marginRight: ".5rem",
              marginLeft: "auto",
              fontWeight: "bold",
            }}
            gutterBottom
          >
            &#8377; {getGrandTotal()}
          </Typography>
        </div>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Delivery Address
          </Typography>
          <Typography gutterBottom>
            {user.userDetails.name}, {user.userDetails.contactNo}
          </Typography>
          <Typography gutterBottom>{user.userDetails.address}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
