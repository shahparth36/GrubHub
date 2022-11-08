import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

import DashboardNavbar from "../components/DashboardNavbar";
import RestaurantMainLayout from "../components/Restaurant/MainLayout";
import DeliveryAgentMainLayout from "../components/DeliveryAgent/MainLayout";

import LoadingSpinner from "../components/LoadingSpinner";

import axios from "../axios";

import { UserContext } from "../context/userContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        setIsLoading(true);
        const response = await axios.get("/user");
        const user = response.data.user;
        // let restaurantDetails;
        // if (!user.managers) restaurantDetails = user.userDetails;
        // else {
        //   const response = await axios.get(`/restaurant/manager/${user.userDetails._id}`);
        //   restaurantDetails = response.data.restaurant;
        // }
        if (
          response.data.user.role !== "RESTAURANT_MANAGER" &&
          response.data.user.role !== "DELIVERY_AGENT" &&
          !response.data.user.managers
        ) {
          navigate("/home");
        } else {
          window.localStorage.setItem("ghisAuthenticated", "true");
          setUser({
            isAuthenticated: true,
            userDetails: user,
          });
        }
        // setRestaurant(restaurantDetails);
        setIsLoading(false);
      } catch (error) {
        window.localStorage.setItem("ghisAuthenticated", "false");
        setUser({
          isAuthenticated: false,
          userDetails: {},
        });
        setIsLoading(false);
      }
    }
    verifyUser();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!user.isAuthenticated ? (
            <Navigate to="/partner/login" />
          ) : (
            <>
              <DashboardNavbar
                role={user.userDetails.role}
                restaurantName={"Granville Greens"}
              />
              {user.userDetails.role === "DELIVERY_AGENT" ? (
                <DeliveryAgentMainLayout />
              ) : (
                <RestaurantMainLayout />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
