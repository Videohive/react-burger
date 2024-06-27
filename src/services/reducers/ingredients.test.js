import { ingredientsReducer } from "./ingredients";
import { initialState } from "../initialState";
import {
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_FAILED,
} from "../actions";
import { mockIngredients } from "../../utils/mock-data";

describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState.data);
    });

    it('should handle INGREDIENTS_REQUEST', () => {
        const action = {
            type: INGREDIENTS_REQUEST,
        };
        expect(ingredientsReducer(undefined, action)).toEqual({
            ...initialState.data,
            isLoading: false,
            hasError: false,
        });
    });

    it('should handle INGREDIENTS_SUCCESS', () => {
        const action = {
            type: INGREDIENTS_SUCCESS,
            data: mockIngredients,
        };
        expect(ingredientsReducer(undefined, action)).toEqual({
            ...initialState.data,
            ingredients: action.data,
            isLoading: true,
            hasError: false,
        });
    });

    it('should handle INGREDIENTS_FAILED', () => {
        const action = {
            type: INGREDIENTS_FAILED,
        };
        expect(ingredientsReducer(undefined, action)).toEqual({
            ...initialState.data,
            ingredients: [],
            isLoading: false,
            hasError: true,
        });
    });
});
