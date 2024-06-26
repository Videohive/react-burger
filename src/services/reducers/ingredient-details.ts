import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT
} from "../actions"

import {
  TIngredientDetailsActions
} from "../actions/ingredient-details"

import { TIngredient } from "../../utils/types";

interface IIngredientDetailsState {
  selectedIngredient: TIngredient | null;
}

const initialState: IIngredientDetailsState = {
  selectedIngredient: null,
}

export const ingredientDetailsReducer = (state = initialState, action:TIngredientDetailsActions): IIngredientDetailsState => {
  switch (action.type) {

    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.selectedIngredient
      }
    }

    case UNSELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null
      }
    }

    default: {
      return state;
    }
  }
}
