import style from "./ingredient-details.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SELECT_INGREDIENT } from "../../services/actions";
import { useParams } from "react-router-dom";
import { TIngredient } from '../../utils/types';

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector((store: any) => store.data.ingredients);
  const selectedIngredient: TIngredient | null = useSelector((store: any) => store.ingredientDetails.selectedIngredient);
  const { ingredientId } = useParams();

  useEffect(() => {
    if (!selectedIngredient && ingredientId && ingredients) {
      const ingredient = ingredients.find((ingredient) => ingredient._id === ingredientId);
      dispatch({
        type: SELECT_INGREDIENT,
        selectedIngredient: ingredient,
      });
    }
  }, [selectedIngredient, ingredientId, ingredients, dispatch]);

  return (
    <>
      {selectedIngredient && (
        <div className={style.body}>
          <img src={selectedIngredient.image_large} alt={selectedIngredient.name} className="mb-4" />

          <p className="text text_type_main-medium">{selectedIngredient.name}</p>

          <div className={`mt-8 ${style.details} text_color_inactive`}>
            <div className="text text_type_main-small">
              Калории,ккал
              <br />
              <p className="text text_type_digits-default">{selectedIngredient.calories}</p>
            </div>

            <div className="text text_type_main-small">
              Белки, г
              <br />
              <p className="text text_type_digits-default">{selectedIngredient.proteins}</p>
            </div>

            <div className="text text_type_main-small">
              Жиры, г
              <br />
              <p className="text text_type_digits-default">{selectedIngredient.fat}</p>
            </div>

            <div className="text text_type_main-small">
              Углеводы, г
              <br />
              <p className="text text_type_digits-default">{selectedIngredient.carbohydrates}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
