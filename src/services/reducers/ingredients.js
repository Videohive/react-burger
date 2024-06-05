import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../actions"
import {
  initialState
} from "../initialState"

export const ingredientsReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        isError: false,
        isLoaded: false
      };
    }

    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        isError: false,
        ingredients: action.data
      };
    }

    case INGREDIENTS_FAILED: {
      return {
        ...state,
        isError: true,
        isLoaded: false
      };
    }

    default: {
      return state;
    }
  }
}
