import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/types";
import {
  wsConnectionStartAction,
  wsConnectionClosedAction,
} from "../../services/actions/wsActions";

import { WS_ALL_ORDERS_URL } from "../../utils/const";
import OrderList from "../../components/order-list/order-list";
import { getCorrectOrders } from "../../utils/helpers";
import { TOrder } from "../../utils/types";
import { setCorrectOrdersAction } from "../../services/actions/feed";

export function FeedPage() {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.ws.loading);

  useEffect(() => {
    dispatch(wsConnectionStartAction(WS_ALL_ORDERS_URL));
    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.ws.orders);
  const ingredientsData = useSelector((store) => store.data.ingredients);
  const correctOrders = orders && getCorrectOrders(orders, ingredientsData);

  useEffect(() => {
    dispatch(setCorrectOrdersAction(correctOrders));
  }, [dispatch, correctOrders]);

  const ordersReady: TOrder[] = orders
    .filter((order: TOrder) => order.status === "done")
    .slice(0, 20);
  const ordersInProgress: TOrder[] = orders
    .filter((order: TOrder) => order.status === "pending")
    .slice(0, 20);

  const { total, totalToday } = useSelector((store) => store.ws);

  if (loading) {
    <p>Загружаем...</p>;
  }
  return (
    <main className={styles.main}>
      <h1 className={"text text_type_main-large mb-5 mt-10"}>Лента заказов</h1>
      <div className={styles.sections}>
        <div className={styles.section}>
          <OrderList orders={correctOrders} />
        </div>
        <div className={styles.board}>
          <div className={styles.stats}>
            <div className={styles.status}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <div
                className={`${styles.statusReady} text text_type_digits-default`}
              >
                <div className={styles.numbers}>
                  {ordersReady.map((item) => (
                    <div key={item._id}>{item.number}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.ordersDashboardStatus}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <div className="text text_type_digits-default">
                <div className={styles.orderDashboardNumbers}>
                  {ordersInProgress.map((item) => (
                    <div key={item._id}>{item.number}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className={"text text_type_main-medium mt-15"}>
              Выполнено за все время:
            </p>
            <p className={`${styles.shadow} text text_type_digits-large`}>
              {total.toLocaleString("ru")}
            </p>
            <p className={"text text_type_main-medium mt-15"}>
              Выполнено за сегодня:
            </p>
            <p className={`${styles.shadow} text text_type_digits-large`}>
              {totalToday.toLocaleString("ru")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
