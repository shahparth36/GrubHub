import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent, Grid, TextField } from "@mui/material";

function AddManager({ isOpen, handleClose, handleSubmit }) {
  const [manager, setManager] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
  });

  const handleChange = (event) => {
    setManager({ ...manager, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    handleSubmit(manager);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Add Manager</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="manager-name"
                name="name"
                required
                fullWidth
                id="managerName"
                value={manager.name}
                onChange={handleChange}
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="contactNo"
                label="Contact No"
                name="contactNo"
                value={manager.contactNo}
                onChange={handleChange}
                autoComplete="contactNo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={manager.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={manager.password}
                onChange={handleChange}
                autoComplete="new-password"
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

export default AddManager;
