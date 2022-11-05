import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import { Divider } from "@mui/material";

import Navbar from "../components/Navbar";
import TopRestaurants from "../components/TopRestaurants";
import TrendingFoodItems from "../components/TrendingFoodItems";
import Signup from "../components/Signup";
import Login from "../components/Login";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackBar from "../components/FeedbackBar";

import axios from "../axios";

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(false);

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  const closeModal = (modal) => {
    if (modal === "LOGIN") setIsLoginModalOpen(false);
    else if (modal === "SIGN_UP") setIsSignupModalOpen(false);
  };

  const openModal = (modal) => {
    if (modal === "LOGIN") setIsLoginModalOpen(true);
    else if (modal === "SIGN_UP") setIsSignupModalOpen(true);
  };

  useEffect(() => {
    async function verifyUser() {
      try {
        setIsLoading(true);
        const response = await axios.get("/user");
        const user = response.data.user;
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        setUser(false);
        setIsLoading(false);
      }
    }
    verifyUser();
  }, [isLoginModalOpen, isSignupModalOpen]);

  return (
    <>
      {!isLoading ? (
        <>
          <FeedbackBar
            feedbackbar={feedbackbar}
            closeFeedbackbar={closeFeedbackbar}
          />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Navbar openModal={openModal} user={user} />
            </Grid>
            <Grid item xs={12}>
              <TopRestaurants />
            </Grid>
            <Grid item xs={12}>
              <TrendingFoodItems />
            </Grid>
            <Signup
              isSignupModalOpen={isSignupModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              setFeedbackbar={setFeedbackbar}
            />
            <Login
              isLoginModalOpen={isLoginModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              setFeedbackbar={setFeedbackbar}
            />
          </Grid>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Home;
