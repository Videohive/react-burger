import { CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_ADD_BUN, CONSTRUCTOR_SORT_INGREDIENT } from "../actions";
import { v4 as uuidv4 } from 'uuid';
import { initialState } from "../initialState";

export const constructorReducer = (state = initialState.ingredients, action) => {

	switch(action.type) {
		case CONSTRUCTOR_SORT_INGREDIENT: {
			const newState = [...state.main];
			newState[action.from] = newState.splice(action.to, 1, newState[action.from])[0];
      	return {...state, main: newState};
		}

    case CONSTRUCTOR_ADD_INGREDIENT: {
			return {...state, main: [...state.main, {...action.item, uuid: uuidv4()}]};
		}

		case CONSTRUCTOR_REMOVE_INGREDIENT: {
			const main = [...state.main];
			const itemId = main.findIndex((e) => e.uuid === action.uuid);
			main.splice(itemId, 1);
			return {...state, main: main};
		}

		case CONSTRUCTOR_ADD_BUN: {
			return {...state, bun: {...action.item, uuid: uuidv4()}};
		}

		default: {
			return state;
		}
	}
}
