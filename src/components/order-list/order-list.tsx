import styles from "./order-list.module.css";
import { FC } from "react";
import { useDispatch } from "../../services/types";
import { TCorrectOrder } from "../../utils/types";
import OrderCard from "../order-card/order-card";
import { selectOrderAction } from "../../services/actions/feed";

type TOrderList = {
  orders: TCorrectOrder[];
};

const OrderList: FC<TOrderList> = ({ orders }) => {
  const dispatch = useDispatch();

  function onHandleSelectOrder(order: TCorrectOrder) {
    dispatch(selectOrderAction(order));
  }

  return (
    <ul className={styles.list}>
      {orders.map((order) => (
        <OrderCard
          order={order}
          key={order._id}
          onSelect={onHandleSelectOrder}
        />
      ))}
    </ul>
  );
};

export default OrderList;
