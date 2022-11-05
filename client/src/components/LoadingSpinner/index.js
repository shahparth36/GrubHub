import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner({ forWholePage }) {
  let styling;
  if (forWholePage === true) {
    styling = {
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    };
  } else {
    styling = {
      display: "flex",
      m: 5,
      justifyContent: "center",
    };
  }
  return (
    <Box sx={styling}>
      <CircularProgress />
    </Box>
  );
}
