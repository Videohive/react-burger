import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/use-modal';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const Ingredient = ({ data }) => {
  const {_id, image, name, price} = data;
  const {bun, main} = useSelector(store => store.ingredients);
  const { isModalOpen, openModal, closeModal } = useModal();

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
      <div className={`${style.burgerData} mr-6 mb-8`} onClick={openModal} ref={ref} style={{ opacity }}>
        {count > 0 && <Counter size="small" count={count}/>}
        <img src={image} alt="ингредиент" />
        <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <span className={style.textAlignCenter}>{name}</span>
      </div>
      {isModalOpen && <Modal title='Детали ингредиента' onClose={closeModal}><IngredientDetails data={data} /></Modal>}
    </>
  );
};

Ingredient.propTypes = {
  data: ingredientsPropTypes.isRequired,
  count: PropTypes.number
}

export default Ingredient;
