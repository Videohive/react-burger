// Ingredient.tsx

import React from 'react';
import style from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from '../../utils/types';

type IngredientProps = {
  data: TIngredient;
  onSelect: (data: TIngredient) => void;
};

const Ingredient: React.FC<IngredientProps> = ({ data, onSelect }) => {
  const location = useLocation();
  const { _id, image, name, price } = data;
  const { bun, main } = useSelector((store: any) => store.ingredients);

  const countItems = main.filter((item: TIngredient) => item._id === _id).length;
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
    <div className={`${style.burgerData} mr-6 mb-8`} onClick={() => onSelect(data)} ref={ref} style={{ opacity }}>
      <Link className={style.linkWrapper} to={`/ingredients/${_id}`} state={{ background: location }}>
        {count > 0 && <Counter size="small" count={count} />}
        <img src={image} alt="ингредиент" />
        <span className={`${style.span} m-1 text text_type_digits-default`}>
          <span className="pr-3">{price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <span className={style.textAlignCenter}>{name}</span>
      </Link>
    </div>
  );
};

export default Ingredient;
