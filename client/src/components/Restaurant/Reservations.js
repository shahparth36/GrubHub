import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";

import axios from "../../axios";

import LoadingSpinner from "../LoadingSpinner";
import FeedbackBar from "../FeedbackBar";

import { UserContext } from "../../context/userContext";

function Reservations() {
  const { user } = useContext(UserContext);

  const [restaurantReservations, setRestaurantReservations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateOrderModalOpen, setIsUpdateOrderModalOpen] = useState(false);

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
        const reservationResponse = await axios.get(
          `/reservations/restaurant/${restaurantId}`
        );
        setRestaurantReservations(reservationResponse.data.reservations);
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
  }, [isUpdateOrderModalOpen]);

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
              }}
            >
              Your reservations for the day
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Customer Contact</TableCell>
                    <TableCell align="center">Customer Email</TableCell>
                    <TableCell align="center">No Of Guests</TableCell>
                    <TableCell align="center">Session</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurantReservations &&
                    restaurantReservations.map(
                      (restaurantReservation, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {restaurantReservation.customer.name}
                          </TableCell>
                          <TableCell align="center">
                            {restaurantReservation.customer.contactNo}
                          </TableCell>
                          <TableCell align="center">
                            {restaurantReservation.customer.email}
                          </TableCell>
                          <TableCell align="center">
                            {restaurantReservation.noOfGuests}
                          </TableCell>
                          <TableCell align="center">
                            {restaurantReservation.session}
                          </TableCell>
                        </TableRow>
                      )
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

export default Reservations;
