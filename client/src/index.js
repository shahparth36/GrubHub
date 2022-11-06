import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { UserContextProvider } from "./context/userContext";
import { FeedbackbarContextProvider } from "./context/feedbackbarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FeedbackbarContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </FeedbackbarContextProvider>
  </BrowserRouter>
);
