import Home from "../pages/Home";
import Order from "../pages/Order";
import Checkout from "../pages/Checkout";
import OrderDetails from "../pages/OrderDetails";

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
];

export default routes;
