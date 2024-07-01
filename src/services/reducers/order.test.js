import { orderReducer} from './order';
import { initialState } from "../initialState";
import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_ERROR
} from "../actions"

describe('orderDetailsReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState.order);
    });

    it('should handle ORDER_REQUEST', () => {
        const action = {
            type: ORDER_REQUEST,
        };
        expect(orderReducer(undefined, action)).toEqual({
            ...initialState.order,
            hasError: false,
            isLoading: false
        });
    });

    it('should handle ORDER_SUCCESS', () => {
        const action = {
            type: ORDER_SUCCESS,
            id: '12345',
        };
        expect(orderReducer(undefined, action)).toEqual({
            ...initialState.order,
            isLoading: true,
            hasError: false,
            id: '12345',
        });
    });

    it('should handle ORDER_ERROR', () => {
        const action = {
            type: ORDER_ERROR,
        };
        expect(orderReducer(undefined, action)).toEqual({
            ...initialState.order,
            isLoading: false,
            hasError: true,
        });
    });
});
