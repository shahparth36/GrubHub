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
import AddDish from "./AddDish";

function Dishes() {
  const { user } = useContext(UserContext);

  const [dishes, setDishes] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);

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

  const handleAddDish = () => setIsAddDishModalOpen(true);

  const handleAddDishClose = () => setIsAddDishModalOpen(false);

  const addDish = async (dishDetails) => {
    try {
      setIsLoading(true);

      await axios.post("/food", { foodItems: [dishDetails], restaurantId });
      setFeedbackbar({
        isOpen: true,
        message: "Added dish successfully",
        severity: "success",
      });
      setIsAddDishModalOpen(false);
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
        const dishesResponse = await axios.get(
          `/dishes/restaurant/${restaurantId}`
        );
        setDishes(dishesResponse.data.dishes);
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
  }, [isAddDishModalOpen]);

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
          <AddDish
            isOpen={isAddDishModalOpen}
            handleClose={handleAddDishClose}
            handleSubmit={addDish}
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
              Your Dishes
            </Typography>
            <Button
              onClick={handleAddDish}
              style={{ alignSelf: "center", marginBottom: "1rem" }}
              variant="contained"
              color="secondary"
            >
              Add Dish
            </Button>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Dish Name</TableCell>
                    <TableCell align="center">Rate</TableCell>
                    <TableCell align="center">Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dishes.length === 0 ? (
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
                          onClick={handleAddDish}
                        >
                          Click here
                        </Link>{" "}
                        to get started
                      </Typography>
                    </div>
                  ) : (
                    dishes.map((dish, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {dish.name}
                        </TableCell>
                        <TableCell align="center">
                          &#8377; {dish.pricePerQuantity}
                        </TableCell>
                        <TableCell align="center">{dish.category}</TableCell>
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

export default Dishes;
