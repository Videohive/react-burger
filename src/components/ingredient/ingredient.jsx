
import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Ingredient = ({ data, count }) => (
  <div className={`${style.burgerData} mr-6 mb-8`}>
      {count > 0 && <Counter size="small"/>}
      <img src={data.image} alt="ингредиент"/>
      <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{data.price}</span>
          <CurrencyIcon type="primary" />
      </span>
      <span style={{textAlign: 'center'}}>{data.name}</span>
  </div>
);

Ingredient.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  count: PropTypes.number.isRequired
}

export default Ingredient;
