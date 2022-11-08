import React, { useState } from "react";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent, Grid, TextField } from "@mui/material";

function AddDish({ isOpen, handleClose, handleSubmit }) {
  const [dish, setDish] = useState({
    name: "",
    pricePerQuantity: "",
    category: "",
    password: "",
  });

  const handleChange = (event) => {
    setDish({ ...dish, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    handleSubmit(dish);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Add Dish</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="dish-name"
                name="name"
                required
                fullWidth
                id="dishName"
                value={dish.name}
                onChange={handleChange}
                label="Dish Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="pricePerQuantity"
                label={`Rate`}
                name="pricePerQuantity"
                value={dish.pricePerQuantity}
                onChange={handleChange}
                autoComplete="contactNo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                value={dish.category}
                onChange={handleChange}
                autoComplete="category"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddDish;
