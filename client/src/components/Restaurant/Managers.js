import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Link, Typography } from "@mui/material";

import axios from "../../axios";

import LoadingSpinner from "../LoadingSpinner";
import FeedbackBar from "../FeedbackBar";

import { UserContext } from "../../context/userContext";
import AddManager from "./AddManager";

function Managers() {
  const { user } = useContext(UserContext);

  const [restaurantManagers, setRestaurantManagers] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  const [isAddManagerModalOpen, setIsAddManagerModalOpen] = useState(false);

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

  const handleAddManager = () => setIsAddManagerModalOpen(true);

  const handleAddManagerClose = () => setIsAddManagerModalOpen(false);

  const addManager = async (manager) => {
    try {
      setIsLoading(true);

      const managerDetails = {
        email: manager.email,
        name: manager.name,
        password: manager.password,
        contactNo: manager.contactNo,
        restaurantId,
      };
      const managerResponse = await axios.post(
        "/register/restaurant-manager",
        managerDetails
      );

      const restaurantManagerDetails = {
        userId: managerResponse.data.user._id,
        restaurantId,
      };

      await axios.post("/restaurant-manager", restaurantManagerDetails);
      setFeedbackbar({
        isOpen: true,
        message: "Registered manager successfully",
        severity: "success",
      });
      setIsAddManagerModalOpen(false);
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
          message: "Something went wrong",
          severity: "error",
        });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let restaurantId;
        if (!user.managers) restaurantId = user.userDetails._id;
        else {
          const response = await axios.get(
            `/restaurant/manager/${user.userDetails._id}`
          );
          restaurantId = response.data.restaurant._id;
        }
        const restaurantResponse = await axios.get(
          `/restaurant/${restaurantId}`
        );
        setRestaurantManagers(restaurantResponse.data.restaurant.managers);
        setRestaurantId(restaurantId);
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
            message: "Something went wrong.",
            severity: "error",
          });
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isAddManagerModalOpen]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FeedbackBar
            feedbackbar={feedbackbar}
            closeFeedbackbar={closeFeedbackbar}
          />
          <AddManager
            isOpen={isAddManagerModalOpen}
            handleClose={handleAddManagerClose}
            handleSubmit={addManager}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: 36,
                alignSelf: "center",
                fontWeight: "light",
                padding: "3rem",
                paddingBottom: "1rem",
              }}
            >
              Restaurant Managers
            </Typography>
            <Button
              onClick={handleAddManager}
              style={{
                alignSelf: "center",
                marginRight: "1rem",
                marginBottom: "1rem",
              }}
              variant="contained"
              color="secondary"
            >
              Add Manager
            </Button>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Manager Name</TableCell>
                    <TableCell align="center">Manager Contact</TableCell>
                    <TableCell align="center">Manager Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurantManagers.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "1rem",
                      }}
                    >
                      <Typography style={{ paddingBottom: ".5rem" }}>
                        No Managers found!
                      </Typography>
                      <Typography>
                        <Link
                          style={{ cursor: "pointer" }}
                          onClick={handleAddManager}
                        >
                          Click here
                        </Link>{" "}
                        to get started
                      </Typography>
                    </div>
                  ) : (
                    restaurantManagers.map((restaurantManager, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {restaurantManager.name}
                        </TableCell>
                        <TableCell align="center">
                          {restaurantManager.contactNo}
                        </TableCell>
                        <TableCell align="center">
                          {restaurantManager.email}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Managers;
