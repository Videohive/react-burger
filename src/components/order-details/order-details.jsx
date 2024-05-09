import PropTypes from "prop-types";
import style from "./order-details.module.css";
import orderOk from "../../images/order-ok.png";

const OrderDetails = (props) => {
  const { orderId } = props;

  return (
    <div className={`${style.body} pb-15`}>
      <p className="text text_type_digits-large">{orderId}</p>
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
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;
