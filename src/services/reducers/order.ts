import { ORDER_ERROR, ORDER_REQUEST, ORDER_SUCCESS } from "../actions"
import { initialState, TInitialState } from "../initialState";

import {
  TOrderActionTypes
} from "../actions/order"

// Определяем подтип состояния для редьюсера
type TOrderState = TInitialState["order"];

export const orderReducer = (state = initialState.order, action: TOrderActionTypes): TOrderState => {
	switch(action.type) {
		case ORDER_REQUEST: {
			return {...state, hasError: false, isLoading: false }
		}

		case ORDER_SUCCESS: {
			return {...state, isLoading: true, hasError: false, id: action.id}
		}

    case ORDER_ERROR: {
			return { ...state, hasError: true, isLoading: false }
		}

		default: {
			return state;
		}
	}
}
