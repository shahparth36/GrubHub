import * as React from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Button } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PaymentForm({ isLoading, placeOrder }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <div style={{ borderRadius: "1rem" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Pay Online
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Pay using Card / Net Banking / UPI
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Cash On Delivery
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Please try to keep exact amount of bill ready in cash.
            </Typography>
            <Typography>
              You can also pay online to the delivery agent at the time of
              delivery.
            </Typography>
            <div style={{ paddingTop: "1rem" }}>
              <Button
                variant="contained"
                color="error"
                disabled={isLoading === true}
                onClick={() => placeOrder("CASH_ON_DELIVERY")}
              >
                Place Order
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </React.Fragment>
  );
}
