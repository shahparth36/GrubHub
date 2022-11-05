import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import TextField from "@mui/joy/TextField";
import axios from "../../axios";
import { setToken } from "../../utils/localStorage";

function Login({ isLoginModalOpen, closeModal, openModal, setFeedbackbar }) {
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => {
    closeModal("LOGIN");
  };

  const switchToSignup = () => {
    closeModal("LOGIN");
    openModal("SIGN_UP");
  };

  const handleChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/authenticate", {
        ...userValues,
      });
      const userRole = response.data.role;
      const accessToken = response.data.accessToken;

      if (userRole !== "CUSTOMER")
        setFeedbackbar({
          isOpen: true,
          message: "Invalid User",
          severity: "error",
        });
      else {
        setFeedbackbar({
          isOpen: true,
          message: "Login Successfull",
          severity: "success",
        });
        setToken(accessToken, "ACCESS_TOKEN");
        closeModal("LOGIN");
      }
    } catch (error) {
      setUserValues({
        email: "",
        password: "",
      });
      closeModal("LOGIN");
      setFeedbackbar({
        isOpen: true,
        message: "Incorrect Credentials",
        severity: "error",
      });
    }
  };

  return (
    <Dialog
      open={isLoginModalOpen}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>{"Login"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Email Address"
          placeholder="example@gmail.com"
          value={userValues.email}
          onChange={handleChange}
          name="email"
          size="lg"
          variant="soft"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Password"
          placeholder="Something secret"
          value={userValues.password}
          onChange={handleChange}
          name="password"
          size="lg"
          variant="soft"
        />
      </DialogContent>
      <DialogActions style={{ paddingTop: "0rem" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
      <DialogContent>
        <div style={{ display: "flex" }}>
          <Typography>Don't have an account?</Typography>
          <Button onClick={switchToSignup} style={{ paddingTop: 1 }}>
            Sign up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
