import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Orders from "./Orders";
import Reservations from "./Reservations";
import Managers from "./Managers";
import Dishes from "./Dishes";

function CustomContainer({ value, index, children }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
    >
      {children}
    </Box>
  );
}

function RestaurantMainLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 650,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Orders" />
        <Tab label="Reservations" />
        <Tab label="Managers" />
        <Tab label="Dishes" />
      </Tabs>
      {value === 0 && (
        <CustomContainer value={0} index={0}>
          <Orders />
        </CustomContainer>
      )}
      {value === 1 && (
        <CustomContainer value={1} index={1}>
          <Reservations />
        </CustomContainer>
      )}
      {value === 2 && (
        <CustomContainer value={2} index={2}>
          <Managers />
        </CustomContainer>
      )}
      {value === 3 && (
        <CustomContainer value={3} index={3}>
          <Dishes />
        </CustomContainer>
      )}
    </Box>
  );
}

export default RestaurantMainLayout;
