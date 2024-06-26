import styles from "./order-details.module.css";
import { OrderDetailCard } from "../../components/order-detail-card/order-detail-card";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "../../services/types";
import { getCorrectOrders } from "../../utils/helpers";
import { WS_ALL_ORDERS_URL, WS_USER_ORDERS_URL } from "../../utils/const";
import {
  wsConnectionStartAction,
  wsConnectionClosedAction,
} from "../../services/actions/wsActions";
import {
  wsConnectionUserOrdersStartAction,
  wsConnectionUserOrdersClosedAction,
} from "../../services/actions/wsUserOrderActions";
import {
  selectOrderAction,
  setCorrectOrdersAction,
} from "../../services/actions/feed";
import { TCorrectOrder } from "../../utils/types";

export function OrderDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId?: string }>();

  const accessToken = localStorage.getItem("accessToken");
  const accessTokenWithoutBearer =
    accessToken && accessToken.replace("Bearer ", "");
  const url = WS_USER_ORDERS_URL + `?token=${accessTokenWithoutBearer}`;

  useEffect(() => {
    if (location.pathname.includes("/feed")) {
      dispatch(wsConnectionUserOrdersClosedAction());
      dispatch(wsConnectionStartAction(WS_ALL_ORDERS_URL));
      return () => {
        dispatch(wsConnectionClosedAction());
      };
    }
    if (location.pathname.includes("/profile/orders")) {
      console.log("url");
      dispatch(wsConnectionClosedAction());
      dispatch(wsConnectionUserOrdersStartAction(url));
      return () => {
        dispatch(wsConnectionUserOrdersClosedAction());
      };
    }
  }, [location.pathname, url, dispatch]);

  const orders = useSelector((store) => store.ws.orders);
  const userOrders = useSelector((store) => store.userOrders.orders);
  const ingredientsData = useSelector((store) => store.data.ingredients);
  const correctOrders =
    !userOrders.length && orders.length
      ? getCorrectOrders(orders, ingredientsData)
      : getCorrectOrders(userOrders, ingredientsData);
  const selectedOrder = useSelector((store) => store.feed.selectedOrder);

  useEffect(() => {
    dispatch(setCorrectOrdersAction(correctOrders));
    if (!selectedOrder && orderId && correctOrders) {
      const order = correctOrders.find(
        (order: TCorrectOrder) => order._id === orderId
      );
      order && dispatch(selectOrderAction(order));
    }
  }, [dispatch, correctOrders, selectedOrder, orderId]);

  return (
    <main className={`${styles.container} mt-30`}>
      <OrderDetailCard />
    </main>
  );
}
