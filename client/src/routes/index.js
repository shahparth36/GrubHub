import { Navigate } from "react-router";

import Home from "../pages/Home";
import Order from "../pages/Order";
import CustomerOrders from "../pages/CustomerOrders";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";
import Search from "../pages/Search";
import Restaurant from "../pages/Restaurant";
import Reservations from "../pages/Reservations";

import PartnerLogin from "../pages/PartnerLogin";
import Dashboard from "../pages/Dashboard";
import PartnerRegistration from "../pages/PartnerRegistration";

import CustomerLayout from "../components/CustomerLayout";

const routes = [
  {
    path: "/partner/login",
    element: <PartnerLogin />,
  },
  {
    path: "/partner/registration/:userType",
    element: <PartnerRegistration />,
  },
  {
    path: "/partner",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/orders",
        element: <CustomerOrders />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/restaurant/:restaurantId",
        element: <Restaurant />,
      },
      {
        path: "/reservations",
        element: <Reservations />,
      },
    ],
  },
];

export default routes;
