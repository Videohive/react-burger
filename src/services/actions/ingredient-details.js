import {
  SELECT_INGREDIENT
} from "../actions";

export function selectIngredient(ingredient) {
  return {
    type: SELECT_INGREDIENT,
    selectedIngredient: ingredient
  }
}
