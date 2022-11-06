import React, { useState, createContext } from "react";

export const FeedbackbarContext = createContext();

export const FeedbackbarContextProvider = (props) => {
  const closeFeedbackbar = () => {
    setFeedbackbar({
      ...feedbackbar,
      isOpen: false,
      message: "",
      severity: "",
    });
  };

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
    close: closeFeedbackbar,
  });

  return (
    <FeedbackbarContext.Provider value={{ feedbackbar, setFeedbackbar }}>
      {props.children}
    </FeedbackbarContext.Provider>
  );
};
