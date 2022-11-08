import React from "react";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import Chip from "@mui/material/Chip";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

function DishItems({ items, isOpen, handleClose }) {
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Order Items</DialogTitle>
      <List sx={{ p: 1, pt: 0, pl: 0, pb: 2 }}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                <RestaurantMenuIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              style={{ marginRight: "1rem" }}
              primary={item.foodId.name}
            />
            <Typography style={{ marginRight: "1rem" }}>x</Typography>
            <Chip color="secondary" label={item.quantity} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default DishItems;
