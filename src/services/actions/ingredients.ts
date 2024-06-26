import { AppThunk } from "../types";

import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_ADD_BUN,
} from "./index";

import { TIngredient } from "../../utils/types";

import request from "../../utils/request";
import { v4 as uuidv4 } from "uuid";

export interface IGetIngredientsAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly data: TIngredient[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
}

export interface IAddIngredientAction {
  readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
  readonly item: TIngredient & { uuid: string };
}

export interface IAddBunAction {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
  readonly item: TIngredient & { uuid: string };
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddIngredientAction
  | IAddBunAction;

export const addIngredient = (item: TIngredient): IAddIngredientAction => {
  return {
    type: CONSTRUCTOR_ADD_INGREDIENT,
    item: { ...item, uuid: uuidv4() },
  };
};

export const addBun = (item: TIngredient): IAddBunAction => {
  return {
    type: CONSTRUCTOR_ADD_BUN,
    item: { ...item, uuid: uuidv4() },
  };
};

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (
  data: TIngredient[]
): IGetIngredientsSuccessAction => ({
  type: INGREDIENTS_SUCCESS,
  data,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: INGREDIENTS_FAILED,
});

export const getIngredients = (): AppThunk => async (dispatch) => {
  dispatch(getIngredientsAction());
  request("ingredients")
    .then((data) => {
      dispatch(getIngredientsSuccessAction(data.data));
    })
    .catch((err) => {
      dispatch(getIngredientsFailedAction());
      console.log(err);
    });
};
