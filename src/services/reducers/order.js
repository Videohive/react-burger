import { ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../actions"
import { initialState } from "../initialState"

export const orderReducer = (state = initialState.order, action) => {
	switch(action.type) {
		case ORDER_REQUEST: {
			return {...state, hasError: false, isLoaded: false }
		}

		case ORDER_SUCCESS: {
			return {...state, isLoaded: true, hasError: false, id: action.id}
		}

    case ORDER_ERROR: {
			return { ...state, hasError: true, isLoaded: false }
		}

		default: {
			return state;
		}
	}
}
