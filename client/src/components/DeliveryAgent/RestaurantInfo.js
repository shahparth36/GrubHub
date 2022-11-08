import React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { purple } from "@mui/material/colors";

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function RestaurantInfo({ handleClose, isOpen, restaurant }) {
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Restaurant Info</DialogTitle>
      <List sx={{ p: 1, pt: 0, pl: 0, pb: 2 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
              <RestaurantMenuIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem" }}
            primary={restaurant.name}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem" }}
            primary={restaurant.email}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
              <CallIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem" }}
            primary={restaurant.contactNo}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
              <LocationOnIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem" }}
            primary={restaurant.address}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default RestaurantInfo;
