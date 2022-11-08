import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import LoadingSpinner from "../components/LoadingSpinner";

import axios from "../axios";

import { UserContext } from "../context/userContext";

function Reservations() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [reservations, setReservations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (!user.isAuthenticated) navigate("/");
        const response = await axios.get(
          `/reservations/customer/${user.userDetails._id}`
        );
        setReservations(response.data.reservations);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography sx={{ fontSize: 36, fontWeight: "Light", padding: "2rem" }}>
        Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Restaurant</TableCell>
              <TableCell align="center">Guests</TableCell>
              <TableCell align="center">Session</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations &&
              reservations.map((reservation, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {reservation.restaurant.name}
                  </TableCell>
                  <TableCell align="center">{reservation.noOfGuests}</TableCell>
                  <TableCell align="center">{reservation.session}</TableCell>
                  <TableCell align="center">
                    {new Date(reservation.date).toDateString().toString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Reservations;
