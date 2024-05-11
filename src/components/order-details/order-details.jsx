import style from "./order-details.module.css";
import orderOk from "../../images/order-ok.png";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const order = useSelector((store) => store.order);
  return (
    <div className={`${style.body} pb-15`}>
      {order.isLoaded ? (
        <>
          <p className="text text_type_digits-large">{order.id}</p>
          <p className={`text text_type_main-medium ${style.info}`}>
            идентификатор заказа
          </p>
          <img src={orderOk} alt="ok" className={`${style.ok} pb-15 pt-15`} />
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p
            className={`text text_type_main-default ${style.wait} text_color_inactive`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : <p>Загружаем...</p>}
    </div>
  );
};


export default OrderDetails;
