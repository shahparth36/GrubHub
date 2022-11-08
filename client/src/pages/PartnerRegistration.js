import React, { useState } from "react";
import { useParams } from "react-router";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import axios from "../axios";

import Copyright from "../components/Copyright";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackBar from "../components/FeedbackBar";

const theme = createTheme();

export default function PartnerRegistration() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const closeFeedbackbar = () => {
    setFeedbackbar({
      isOpen: false,
      message: "",
      severity: "",
    });
  };

  const handleSubmit = async (event) => {
    try {
      setIsLoading(true);
      const data = new FormData(event.currentTarget);
      if (params.userType === "restaurant") {
        const restaurantDetails = {
          name: data.get("restaurantName"),
          contactNo: data.get("contactNo"),
          email: data.get("email"),
          password: data.get("password"),
          address: data.get("address"),
        };
        await axios.post("/restaurant", restaurantDetails);
        setFeedbackbar({
          isOpen: true,
          message: "Restaurant registered successfully",
          severity: "success",
        });
      } else if (params.userType === "delivery-agent") {
        const deliveryAgentDetails = {
          name: data.get("name"),
          contactNo: data.get("contactNo"),
          email: data.get("email"),
          password: data.get("password"),
        };
        await axios.post("/register/delivery-agent", deliveryAgentDetails);
        setFeedbackbar({
          isOpen: true,
          message: "Registration Successfull",
          severity: "success",
        });
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data.error)
        setFeedbackbar({
          isOpen: true,
          message: error.response.data.error,
          severity: "error",
        });
      else
        setFeedbackbar({
          isOpen: true,
          message: "Something went wrong. Try again",
          severity: "error",
        });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FeedbackBar
            feedbackbar={feedbackbar}
            closeFeedbackbar={closeFeedbackbar}
          />
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {params.userType === "restaurant" ? (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="restaurant-name"
                            name="restaurantName"
                            required
                            fullWidth
                            id="restaurantName"
                            label="Restaurant Name"
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
                            autoComplete="new-password"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="address"
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="delivery-agent-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
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
                            autoComplete="new-password"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/partner/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
