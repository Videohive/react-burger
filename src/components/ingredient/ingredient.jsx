import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const Ingredient = ({ data, onOpenModal  }) => {
  const {_id, image, name, price} = data;
  const {bun, main} = useSelector(store => store.ingredients);

  const countItems = main.filter(item => item._id === _id).length;
  const countBuns = bun?._id === _id ? 2 : 0;
  const count = countItems + countBuns;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <>
      <div className={`${style.burgerData} mr-6 mb-8`} onClick={() => onOpenModal(data)} ref={ref} style={{ opacity }}>
        {count > 0 && <Counter size="small" count={count}/>}
        <img src={image} alt="ингредиент" />
        <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <span className={style.textAlignCenter}>{name}</span>
      </div>
    </>
  );
};

Ingredient.propTypes = {
  data: ingredientsPropTypes.isRequired,
  count: PropTypes.number
}

export default Ingredient;
