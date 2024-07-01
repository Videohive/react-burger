import { constructorReducer } from './constructor';
import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_SORT_INGREDIENT,
    CONSTRUCTOR_CLEAN
} from '../actions';
import { initialState } from '../initialState';

import { mockConstructorIngredient, mockIngredientBun } from "../../utils/mock-data";

describe('constructorReducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState.ingredients);
    });

    it('should handle CONSTRUCTOR_ADD_INGREDIENT', () => {
        const action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            item: mockIngredientBun
        };
        expect(constructorReducer(initialState.ingredients, action)).toEqual({
            ...initialState.ingredients,
            main: [ ...initialState.ingredients.main, action.item ]
        });
    });

    it('should handle CONSTRUCTOR_REMOVE_INGREDIENT', () => {
        const action = {
            type: CONSTRUCTOR_REMOVE_INGREDIENT,
            uuid: mockConstructorIngredient.uuid
        };
        expect(constructorReducer({
            ...initialState.ingredients,
            main: [mockConstructorIngredient]
        }, action)).toEqual({
            ...initialState.ingredients,
            main: []
        });
    });

    it('should handle CONSTRUCTOR_ADD_BUN', () => {
        const action = {
            type: CONSTRUCTOR_ADD_BUN,
            item: mockIngredientBun
        };
        expect(constructorReducer(initialState.ingredients, action)).toEqual({
            ...initialState.ingredients,
            bun: action.item
        });
    });

    it('should handle CONSTRUCTOR_SORT_INGREDIENT', () => {
        const action = {
            type: CONSTRUCTOR_SORT_INGREDIENT,
            from: 0,
            to: 1
        };
        expect(constructorReducer({
            ...initialState.ingredients,
            main: [{ id: 1, name: 'Ingredient 1' }, { id: 2, name: 'Ingredient 2' }]
        }, action)).toEqual({
            ...initialState.ingredients,
            main: [{ id: 2, name: 'Ingredient 2' }, { id: 1, name: 'Ingredient 1' }]
        });
    });

    it('should handle CONSTRUCTOR_CLEAN', () => {
        const action = { type: CONSTRUCTOR_CLEAN };
        expect(constructorReducer({
            ...initialState.ingredients,
            main: [mockIngredientBun],
            bun: mockIngredientBun
        }, action)).toEqual({
            ...initialState.ingredients,
            main: [],
            bun: null
        });
    });
});
