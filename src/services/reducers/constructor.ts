import { CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_ADD_BUN, CONSTRUCTOR_SORT_INGREDIENT, CONSTRUCTOR_CLEAN } from "../actions";
import { TConstructorActions } from "../actions/constructor-item";
import { initialState, TInitialState } from "../initialState";

// Определяем подтип состояния для редьюсера
type TIngredientsState = TInitialState["ingredients"];

export const constructorReducer = (state = initialState.ingredients, action: TConstructorActions): TIngredientsState => {
  switch(action.type) {
    case CONSTRUCTOR_SORT_INGREDIENT: {
      const newState = [...state.main];
      newState[action.from] = newState.splice(action.to, 1, newState[action.from])[0];
      return {...state, main: newState};
    }

    case CONSTRUCTOR_ADD_INGREDIENT: {
      return {...state, main: [...state.main, action.item]};
    }

    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      const main = [...state.main];
      const itemId = main.findIndex((e) => e.uuid === action.uuid);
      if (itemId !== -1) {
        main.splice(itemId, 1);
      }
      return {...state, main: main};
    }

    case CONSTRUCTOR_ADD_BUN: {
      return {...state, bun: action.item};
    }

    case CONSTRUCTOR_CLEAN: {
      return {...state, main: [], bun: null};
    }

    default: {
      return state;
    }
  }
};
