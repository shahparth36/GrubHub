import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router";
import Copyright from "../components/Copyright";
import FeedbackBar from "../components/FeedbackBar";

import axios from "../axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserContext } from "../context/userContext";
import { setToken } from "../utils/localStorage";

const theme = createTheme();

const userTypes = ["Restaurant", "Delivery Partner"];

function PartnerLogin() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const userDetails = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const response = await axios.post("/auth/authenticate", userDetails);
      const accessToken = response.data.accessToken;
      setUser({
        isAuthenticated: true,
        userDetails: response.data.user,
      });
      setToken(accessToken, "ACCESS_TOKEN");
      setFeedbackbar({
        isOpen: true,
        message: "User authenticated successfully",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/partner");
      }, 3000);
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
          message: "Something went wrong. Try again.",
          severity: "error",
        });
      setIsLoading(false);
    }
  };

  const handleClick = () => setIsModalOpen(true);

  const handleClose = () => setIsModalOpen(false);

  const handleListItemClick = (value) => {
    if (value === "Restaurant") navigate("/partner/registration/restaurant");
    else if (value === "Delivery Partner")
      navigate("/partner/registration/delivery-agent");
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
            <Dialog onClose={handleClose} open={isModalOpen}>
              <DialogTitle>
                Which kind of account you want to register?
              </DialogTitle>
              <List sx={{ pt: 0 }}>
                {userTypes.map((userType) => (
                  <ListItem
                    button
                    onClick={() => handleListItemClick(userType)}
                    key={userType}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userType} />
                  </ListItem>
                ))}
              </List>
            </Dialog>
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
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        style={{ cursor: "pointer" }}
                        onClick={handleClick}
                        variant="body2"
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
          </ThemeProvider>
        </>
      )}
    </>
  );
}

export default PartnerLogin;
