import ingredientsPropTypes from '../../utils/IngredientsTypes';
import style from "./ingredient-details.module.css";

const IngredientDetails = ({data}) => {
  return (
    <div className={style.body}>
      <img src={data.image_large} alt={data.name} className="mb-4"/>

      <p className="text text_type_main-medium">{data.name}</p>

      <div className={`mt-8 ${style.details} text_color_inactive`}>
        <div className="text text_type_main-small">
          Калории,ккал
          <br />
          <p className="text text_type_digits-default">{data.calories}</p>
        </div>

        <div className="text text_type_main-small">
          Белки, г<br />
          <p className="text text_type_digits-default">{data.proteins}</p>
        </div>

        <div className="text text_type_main-small">
          Жиры, г<br />
          <p className="text text_type_digits-default">{data.fat}</p>
        </div>

        <div className="text text_type_main-small">
          Углеводы, г<br />
          <p className="text text_type_digits-default">
            {data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  props: ingredientsPropTypes,
};

export default IngredientDetails;
