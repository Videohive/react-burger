import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT
} from ".";

import { TIngredient } from "../../utils/types";

export interface ISelectIngredientAction {
  readonly type: typeof SELECT_INGREDIENT;
  readonly selectedIngredient: TIngredient;
}

export interface IUnselectIngredientAction {
  readonly type: typeof UNSELECT_INGREDIENT;
  readonly selectedIngredient: TIngredient;
}

export type TIngredientDetailsActions =
  | ISelectIngredientAction
  | IUnselectIngredientAction

export const selectIngredientAction = (
  selectedIngredient: TIngredient
): ISelectIngredientAction => ({
  type: SELECT_INGREDIENT,
  selectedIngredient,
});

export function selectIngredient(ingredient: TIngredient) {
  return {
    type: SELECT_INGREDIENT,
    selectedIngredient: ingredient
  }
}
