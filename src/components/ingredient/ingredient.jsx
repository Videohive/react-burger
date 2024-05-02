
import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';

const Ingredient = ({ data, count }) => (
  <div className={`${style.burgerData} mr-6 mb-8`}>
      {count > 0 && <Counter size="small"/>}
      <img src={data.image} alt="ингредиент"/>
      <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{data.price}</span>
          <CurrencyIcon type="primary" />
      </span>
      <span className={style.textAlignCenter}>{data.name}</span>
  </div>
);

Ingredient.prototype = {
  data: ingredientsPropTypes.isRequired,
  count: PropTypes.number.isRequired
}

export default Ingredient;
