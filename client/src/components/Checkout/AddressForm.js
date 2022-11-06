import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddressForm({ address }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Delivery Address
      </Typography>
      <Grid>
        <Grid item xs={12} sm={6}>
          <Textarea
            color="primary"
            minRows={2}
            placeholder="Address"
            value={address}
            disabled={true}
            name="address"
            size="lg"
            variant="soft"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
