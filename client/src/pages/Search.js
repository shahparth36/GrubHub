import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import SearchIcon from "@mui/icons-material/Search";

import axios from "../axios";

import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackBar from "../components/FeedbackBar";

const Searchbar = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid rgba(40,44,63,.3)",
  borderRadius: "3px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: "48px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const ItemDisplay = styled("div")(({ theme }) => ({
  padding: "1rem",
  paddingTop: "1rem",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#f2f6fc",
    cursor: "pointer",
  },
}));

const CustomCard = styled("div")(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#f2f6fc",
  },
  border: "none",
  display: "flex",
  height: 100,
}));

function Search() {
  const navigate = useNavigate();

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClick = async (item) => {
    if (item.type === "Restaurant") {
      navigate(`/restaurant/${item._id}`);
    } else if (item.type === "Dish") {
      const response = await axios.get(`/food/${item._id}`);
    }
  };

  const closeFeedbackbar = () => {
    setFeedbackbar({
      isOpen: false,
      message: "",
      severity: "",
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (searchValue.trim() !== "") {
          setIsLoading(true);
          const response = await axios.get(
            `/search?searchValue=${searchValue}`
          );
          setSearchResults(response.data.searchResults);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.data.error)
          setFeedbackbar({
            isOpen: true,
            message: error.response.data.error,
            severity: "error",
          });
        else {
          setFeedbackbar({
            isOpen: true,
            message: "Something went wrong",
            severity: "error",
          });
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchValue]);

  return (
    <div>
      <FeedbackBar
        feedbackbar={feedbackbar}
        closeFeedbackbar={closeFeedbackbar}
      />
      <Container maxWidth="md">
        <div style={{ padding: "1rem", paddingTop: "3rem" }}>
          <Searchbar>
            <div style={{ display: "flex" }}>
              <InputBase
                sx={{ ml: 2, mt: 0.5, width: "100%" }}
                placeholder="Search for restaurants and food"
                value={searchValue}
                onChange={handleChange}
                inputProps={{ "aria-label": "Search for restaurants and food" }}
              />
              <IconButton
                sx={{ p: "10px", marginLeft: "auto" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </div>
          </Searchbar>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {searchValue.trim() !== "" && (
              <>
                {searchResults.length > 0 ? (
                  searchResults.map((searchResult, index) => (
                    <ItemDisplay
                      key={index}
                      onClick={() => handleClick(searchResult)}
                    >
                      <CustomCard variant="outlined">
                        <CardMedia
                          component="img"
                          sx={{ width: 120 }}
                          image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80"
                          alt="Live from space album cover"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="h6">
                              {searchResult.name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              {searchResult.type}
                            </Typography>
                          </CardContent>
                        </Box>
                      </CustomCard>
                    </ItemDisplay>
                  ))
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography>No Results Found!</Typography>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Search;
