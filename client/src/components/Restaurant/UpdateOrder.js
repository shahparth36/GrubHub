import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { DialogContent } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function UpdateOrder({ order, isOpen, handleClose, handleUpdate, role }) {
  const [orderStatus, setOrderStatus] = React.useState(
    order.orderStatus !== "OUT_FOR_DELIVERY"
      ? capitalizeFirstLetter(
          order.orderStatus ? order.orderStatus.toLowerCase() : ""
        )
      : "Out For Delivery"
  );

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <FormControl style={{ marginTop: "1rem" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Order Status
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={orderStatus}
            onChange={handleOrderStatusChange}
          >
            <FormControlLabel
              value="Confirmed"
              control={
                <Radio disabled={role === "DELIVERY_AGENT"} color="secondary" />
              }
              label="Confirmed"
            />
            <FormControlLabel
              value="Preparing"
              control={<Radio color="secondary" />}
              label="Preparing"
            />
            <FormControlLabel
              value="Out For Delivery"
              control={<Radio color="secondary" />}
              label="Out For Delivery"
            />
            <FormControlLabel
              value="Completed"
              control={<Radio color="secondary" />}
              label="Completed"
            />
          </RadioGroup>
        </FormControl>
        <div style={{ display: "flex", paddingTop: "1rem" }}>
          <Button
            color="secondary"
            style={{ marginLeft: "auto", marginRight: ".5rem" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleUpdate(order, orderStatus)}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateOrder;
