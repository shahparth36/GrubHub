import React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { purple } from "@mui/material/colors";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function CustomerInfo({ handleClose, isOpen, customer }) {
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Customer Info</DialogTitle>
      <List sx={{ p: 1, pt: 0, pl: 0, pb: 2 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem" }}
            primary={customer.name}
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
            primary={customer.email}
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
            primary={customer.contactNo}
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
            primary={customer.address}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}

export default CustomerInfo;
