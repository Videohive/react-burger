import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/use-modal';

const Ingredient = ({ data, count }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className={`${style.burgerData} mr-6 mb-8`} onClick={openModal}>
        {count > 0 && <Counter size="small" />}
        <img src={data.image} alt="ингредиент" />
        <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{data.price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <span className={style.textAlignCenter}>{data.name}</span>
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
