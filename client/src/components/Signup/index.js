import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import TextField from "@mui/joy/TextField";
import axios from "../../axios";
import { setToken } from "../../utils/localStorage";

import { UserContext } from "../../context/userContext";

function Signup({ isSignupModalOpen, closeModal, openModal, setFeedbackbar }) {
  const { user, setUser } = useContext(UserContext);

  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    password: "",
    contactNo: "",
    address: "",
  });

  const handleClose = () => {
    closeModal("SIGN_UP");
  };

  const switchToLogin = () => {
    closeModal("SIGN_UP");
    openModal("LOGIN");
  };

  const handleChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("/register/customer", {
        ...userValues,
      });
      const authResponse = await axios.post("/auth/authenticate", {
        email: userValues.email,
        password: userValues.password,
      });
      const accessToken = authResponse.data.accessToken;
      setUser({
        isAuthenticated: true,
        userDetails: response.data.user,
      });
      setToken(accessToken, "ACCESS_TOKEN");
      setFeedbackbar({
        isOpen: true,
        message: "Registration Successfull",
        severity: "success",
      });
      closeModal("SIGN_UP");
    } catch (error) {
      setUserValues({
        name: "",
        email: "",
        password: "",
        contactNo: "",
        address: "",
      });
      closeModal("SIGN_UP");
      if (error.response && error.response.data.error) {
        setFeedbackbar({
          isOpen: true,
          message: error.response.data.error,
          severity: "error",
        });
      } else
        setFeedbackbar({
          isOpen: true,
          message: "An Error Occured. Please try again.",
          severity: "error",
        });
    }
  };

  return (
    <Dialog
      open={isSignupModalOpen}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>{"Signup"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          placeholder="Jane Doe"
          value={userValues.name}
          onChange={handleChange}
          name="name"
          size="lg"
          variant="soft"
          style={{ marginBottom: "1rem" }}
        />
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
          label="Contact No"
          placeholder="8129312312"
          value={userValues.contactNo}
          onChange={handleChange}
          name="contactNo"
          size="lg"
          variant="soft"
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Password"
          placeholder="Something Secret"
          value={userValues.password}
          onChange={handleChange}
          name="password"
          size="lg"
          variant="soft"
          style={{ marginBottom: "1.5rem" }}
        />
        <Textarea
          color="neutral"
          minRows={3}
          placeholder="Address"
          value={userValues.address}
          onChange={handleChange}
          name="address"
          size="lg"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSignup}>Sign up</Button>
      </DialogActions>
      <div
        style={{
          display: "flex",
          marginLeft: "1.5rem",
          marginBottom: "1.2rem",
        }}
      >
        <Typography>Already have an account?</Typography>
        <Button onClick={switchToLogin} style={{ paddingTop: 1 }}>
          Login
        </Button>
      </div>
    </Dialog>
  );
}

export default Signup;
