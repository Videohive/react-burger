import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../actions"

import {
  TIngredientsActions
} from "../actions/ingredients"

import { initialState, TInitialState } from "../initialState";

// Определяем подтип состояния для редьюсера
type TIngredientsState = TInitialState["data"];

export const ingredientsReducer = (state = initialState.data, action:TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        hasError: false,
        isLoading: false
      };
    }

    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
        ingredients: action.data
      };
    }

    case INGREDIENTS_FAILED: {
      return {
        ...state,
        hasError: true,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
