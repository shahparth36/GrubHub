import Home from "../pages/Home";
import Order from "../pages/Order";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";
import Search from "../pages/Search";
import Restaurant from "../pages/Restaurant";

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
];

export default routes;
