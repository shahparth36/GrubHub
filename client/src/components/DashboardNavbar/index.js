import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardNavbar = ({ restaurantName, role }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.localStorage.removeItem("ghat");
    window.localStorage.removeItem("ghrt");
    window.localStorage.setItem("ghisAuthenticated", false);
    navigate("/partner/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeliveryDiningIcon
            fontSize="large"
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GrubHub
          </Typography>
          {role !== "DELIVERY_AGENT" && (
            <Box sx={{ ml: "auto" }}>
              <Typography
                style={{
                  fontSize: 20,
                  fontWeight: "light",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {restaurantName}
              </Typography>
            </Box>
          )}
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleClick} color="inherit">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default DashboardNavbar;
