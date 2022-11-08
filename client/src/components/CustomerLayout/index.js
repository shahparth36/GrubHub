import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import LoadingSpinner from "../LoadingSpinner";
import Signup from "../Signup";
import Navbar from "../Navbar";
import Login from "../Login";
import Cart from "../Cart";
import FeedbackBar from "../FeedbackBar";
import { UserContext } from "../../context/userContext";

import axios from "../../axios";
import { Outlet, useNavigate } from "react-router";

function CustomerLayout() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [feedbackbar, setFeedbackbar] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const closeFeedbackbar = () => {
    setFeedbackbar({
      isOpen: false,
      message: "",
      severity: "",
    });
  };

  const handleAddToCart = (foodItem) => {
    let localCart = JSON.parse(window.localStorage.getItem("ghcart"));
    if (!localCart) localCart = [];

    const existingItem =
      localCart && localCart.find((cartItem) => cartItem._id === foodItem._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      localCart.push({ ...foodItem, quantity: 1 });
    }

    const updatedCart = JSON.stringify(localCart);
    window.localStorage.setItem("ghcart", updatedCart);
    setCart({ ...cart, items: localCart });
    setFeedbackbar({
      isOpen: true,
      message: "Added item to cart successfully",
      severity: "success",
    });
  };

  const handleRemoveItemFromCart = (foodItem) => {
    let localCart = JSON.parse(window.localStorage.getItem("ghcart"));

    const existingItem =
      localCart && localCart.find((cartItem) => cartItem._id === foodItem._id);
    if (existingItem.quantity === 1) {
      localCart = localCart.filter(
        (cartItem) => cartItem._id != existingItem._id
      );
    } else {
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i]._id === existingItem._id) localCart[i].quantity -= 1;
      }
    }
    const updatedCart = JSON.stringify(localCart);
    window.localStorage.setItem("ghcart", updatedCart);
    setCart({ ...cart, items: localCart });
    setFeedbackbar({
      isOpen: true,
      message: "Updated cart successfully",
      severity: "success",
    });
  };

  const handleClearCart = () => {
    window.localStorage.removeItem("ghcart");
  };

  const [cart, setCart] = useState({
    items: JSON.parse(window.localStorage.getItem("ghcart")),
    addToCart: handleAddToCart,
    removeItemFromCart: handleRemoveItemFromCart,
    clearCart: handleClearCart,
  });

  const closeModal = (modal) => {
    if (modal === "LOGIN") setIsLoginModalOpen(false);
    else if (modal === "SIGN_UP") setIsSignupModalOpen(false);
    else if (modal === "CART") setIsCartModalOpen(false);
  };

  const openModal = (modal) => {
    if (modal === "LOGIN") setIsLoginModalOpen(true);
    else if (modal === "SIGN_UP") setIsSignupModalOpen(true);
    else if (modal === "CART") setIsCartModalOpen(true);
  };

  useEffect(() => {
    async function verifyUser() {
      try {
        setIsLoading(true);
        const response = await axios.get("/user");
        const user = response.data.user;
        window.localStorage.setItem("ghisAuthenticated", "true");
        setUser({
          isAuthenticated: true,
          userDetails: user,
        });
        if (
          response.data.user.role === "RESTAURANT_MANAGER" ||
          response.data.user.role === "DELIVERY_AGENT" ||
          response.data.user.managers
        )
          navigate("/partner");
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
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FeedbackBar
              feedbackbar={feedbackbar}
              closeFeedbackbar={closeFeedbackbar}
            />
            <Navbar openModal={openModal} user={user} />
            <Signup
              isSignupModalOpen={isSignupModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              setFeedbackbar={setFeedbackbar}
            />
            <Login
              isLoginModalOpen={isLoginModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              setFeedbackbar={setFeedbackbar}
            />
            <Cart
              address={user.address}
              isCartModalOpen={isCartModalOpen}
              cart={cart}
              closeModal={closeModal}
              setFeedbackbar={setFeedbackbar}
            />
            <Outlet />
          </>
        )}
      </CartContext.Provider>
    </>
  );
}

export default CustomerLayout;
