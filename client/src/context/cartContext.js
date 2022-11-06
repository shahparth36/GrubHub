import React from "react";

export const localCart = JSON.parse(window.localStorage.getItem("ghcart"));

export const CartContext = React.createContext(localCart ? localCart : []);
