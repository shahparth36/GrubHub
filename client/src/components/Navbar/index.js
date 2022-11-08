import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";

import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

import { CartContext } from "../../context/cartContext";

const ResponsiveAppBar = ({ user, openModal }) => {
  const navigate = useNavigate();

  const { cart } = React.useContext(CartContext);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleReservationsClick = () => {
    navigate("/reservations");
  };

  const handleOrdersClick = () => {
    navigate("/orders");
  };

  const handleClick = () => {
    window.localStorage.removeItem("ghat");
    window.localStorage.removeItem("ghrt");
    window.localStorage.setItem("ghisAuthenticated", false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeliveryDiningIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GrubHub
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GrubHub
          </Typography>
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Button
              style={{ color: "white", marginRight: ".7rem" }}
              startIcon={<SearchIcon />}
              onClick={handleSearchClick}
            >
              Search
            </Button>
            {user.isAuthenticated && (
              <>
                <Button
                  style={{ color: "white", marginRight: ".7rem" }}
                  startIcon={<ReceiptIcon />}
                  onClick={handleOrdersClick}
                >
                  Orders
                </Button>
                <Button
                  style={{ color: "white", marginRight: ".7rem" }}
                  startIcon={<TableRestaurantIcon />}
                  onClick={handleReservationsClick}
                >
                  Reservations
                </Button>
              </>
            )}
            <IconButton
              size="large"
              onClick={() => openModal("CART")}
              color="inherit"
              style={{ marginRight: ".5rem" }}
            >
              <Badge
                badgeContent={cart.items && cart.items.length}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {user.isAuthenticated ? (
              <>
                <Tooltip title="Logout">
                  <IconButton onClick={handleClick} color="inherit">
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => openModal("LOGIN")}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => openModal("SIGN_UP")}
                  sx={{ marginRight: 1 }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
