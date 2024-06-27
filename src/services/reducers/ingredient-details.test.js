import {
  ingredientDetailsReducer,
  initialState,
} from "./ingredient-details";

import {
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
} from "../actions";

import { mockIngredientBun } from "../../utils/mock-data";

describe("ingredientDetailsReducer", () => {
  it("should return the initial state", () => {
      expect(ingredientDetailsReducer(undefined, {})).toEqual(
          initialState
      );
  });

  it("should handle SELECT_INGREDIENT", () => {
      const action = {
          type: SELECT_INGREDIENT,
          selectedIngredient:  mockIngredientBun,
      };
      expect(ingredientDetailsReducer(undefined, action)).toEqual({
          ...initialState,
          selectedIngredient:  mockIngredientBun,
      });
  });

  it("should handle UNSELECT_INGREDIENT", () => {
      const action = {
          type: UNSELECT_INGREDIENT,
      };
      expect(ingredientDetailsReducer(undefined, action)).toEqual({
          ...initialState,
          selectedIngredient: null,
      });
  });
});
