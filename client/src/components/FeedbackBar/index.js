import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FeedbackBar({ feedbackbar, closeFeedbackbar }) {
  const handleClose = () => {
    closeFeedbackbar(false);
  };

  return (
    <Snackbar
      open={feedbackbar.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={feedbackbar.severity}
        sx={{ width: "100%" }}
      >
        {feedbackbar.message}
      </Alert>
    </Snackbar>
  );
}
