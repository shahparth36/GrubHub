import Home from "../pages/Home";
import Order from "../pages/Order";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";
import Search from "../pages/Search";
import Restaurant from "../pages/Restaurant";
import Reservations from "../pages/Reservations";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/order",
    element: <Order />,
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
];

export default routes;
