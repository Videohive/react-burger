import {
  SELECT_ORDER,
  SET_CORRECT_ORDERS,
  SET_DONE_ORDERS,
  UNSELECT_ORDER,
} from ".";

import { TCorrectOrder, TDoneInProgressOrders } from "../../utils/types";

export interface ISetCorrectOrdersAction {
  readonly type: typeof SET_CORRECT_ORDERS;
  readonly payload: TCorrectOrder[];
}

export interface ISetDoneOrdersAction {
  readonly type: typeof SET_DONE_ORDERS;
  readonly payload: TDoneInProgressOrders;
}

export interface ISelectOrderAction {
  readonly type: typeof SELECT_ORDER;
  readonly payload: TCorrectOrder;
}

export interface IUnselectOrderAction {
  readonly type: typeof UNSELECT_ORDER;
}

export type TFeedActions =
  | ISetCorrectOrdersAction
  | ISetDoneOrdersAction
  | ISelectOrderAction
  | IUnselectOrderAction;

export const setCorrectOrdersAction = (
  orders: TCorrectOrder[]
): ISetCorrectOrdersAction => {
  return {
    type: SET_CORRECT_ORDERS,
    payload: orders,
  };
};

export const selectOrderAction = (order: TCorrectOrder): ISelectOrderAction => {
  return {
    type: SELECT_ORDER,
    payload: order,
  };
};

export const unselectOrderAction = (): IUnselectOrderAction => {
  return {
    type: UNSELECT_ORDER,
  };
};
