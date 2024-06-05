import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT
} from "../actions"

const initialState = {
  selectedIngredient: null,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
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
