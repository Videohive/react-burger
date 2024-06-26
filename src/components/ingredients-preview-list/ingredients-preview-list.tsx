import styles from "./ingredients-preview-list.module.css";
import React, { FC } from "react";
import IngredientsPreviewIcon from "../ingredients-preview-icon/ingredients-preview-icon";
import { TIngredient } from "../../utils/types";

type TIngredientPreviewList = {
  ingredients: TIngredient[];
};

const IngredientPreviewList: FC<TIngredientPreviewList> = ({ ingredients }) => {
  const listToRender =
    ingredients.length > 6 ? ingredients.slice(0, 6) : ingredients;
  const rest = ingredients.length > 6 ? ingredients.length - 6 : 0;

  return (
    <ul className={styles.list}>
      {listToRender.map((ingredient, index) => (
        <li key={index}>
          <IngredientsPreviewIcon
            ingredient={ingredient}
            index={index}
            rest={rest}
            withCascade={true}
          />
        </li>
      ))}
    </ul>
  );
};

export default IngredientPreviewList;
