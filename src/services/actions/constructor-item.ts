import { CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_ADD_BUN, CONSTRUCTOR_SORT_INGREDIENT, CONSTRUCTOR_CLEAN } from "../actions";

export interface IRemoveIngredientAction {
  type: typeof CONSTRUCTOR_REMOVE_INGREDIENT;
  uuid: string;
}

export interface ISortIngredientAction {
  type: typeof CONSTRUCTOR_SORT_INGREDIENT;
  from: number;
  to: number;
}

export interface IAddIngredientAction {
  type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  item: any;
}

export interface IAddBunAction {
  type: typeof CONSTRUCTOR_ADD_BUN;
  item: any;
}

export interface ICleanConstructorAction {
  type: typeof CONSTRUCTOR_CLEAN;
}

export type TConstructorActions = IAddIngredientAction | IRemoveIngredientAction | ISortIngredientAction | IAddBunAction | ICleanConstructorAction;


export const removeIngredientAction = (
  uuid: string
): IRemoveIngredientAction => ({
  type: CONSTRUCTOR_REMOVE_INGREDIENT,
  uuid,
});

export const sortIngredientAction = (
  from: number,
  to: number
): ISortIngredientAction => ({
  type: CONSTRUCTOR_SORT_INGREDIENT,
  from,
  to,
});
