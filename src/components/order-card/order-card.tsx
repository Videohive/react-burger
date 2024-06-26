import styles from "./order-card.module.css";
import { FC, useMemo } from "react";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TCorrectOrder } from "../../utils/types";
import { STATUS } from "../../utils/const";
import IngredientsPreviewList from "../ingredients-preview-list/ingredients-preview-list";
import { formatDate } from "../../utils/helpers";

type TOrderCard = {
  order: TCorrectOrder;
  onSelect: (order: TCorrectOrder) => void;
};

const OrderCard: FC<TOrderCard> = ({ order, onSelect }) => {
  const location = useLocation();
  const { number, ingredients, createdAt, name, _id, status } = order;
  const url = useResolvedPath("").pathname;

  const date = useMemo(() => formatDate(createdAt), [createdAt]);
  const cost = useMemo(
    () => ingredients.reduce((acc, cur) => acc + cur.price * cur.count, 0),
    [ingredients]
  );

  return (
    <li className={styles.card}>
      <Link to={`${url}/${_id}`} state={{ background: location }}>
        <div className={"mt-6 mr-6 ml-6 mb-6"} onClick={() => onSelect(order)}>
          <div className={styles.header}>
            <p className={"text text_type_digits-default"}>{`#${number}`}</p>
            <p className={"text text_type_main-default text_color_inactive"}>
              {date}
            </p>
          </div>
          <p className={"text text_type_main-medium mt-6"}>{name}</p>
          {url === "/profile/orders" && (
            <p
              className={`text text_type_main-small ${
                status === "done" && styles.done
              } mt-2`}
            >
              {status === "created"
                ? STATUS.CREATED
                : status === "pending"
                ? STATUS.PENDING
                : STATUS.DONE}
            </p>
          )}

          <div className={`${styles.container} mt-6`}>
            <IngredientsPreviewList ingredients={ingredients} />
            <div className={`${styles.cost} ml-6`}>
              <p className={"text text_type_digits-default mr-2"}>{cost}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default OrderCard;
