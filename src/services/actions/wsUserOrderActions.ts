import {
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_CLOSED_SUCCESS,
  WS_CONNECTION_ORDERS_ERROR,
  WS_CONNECTION_ORDERS_START,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_GET_USER_ORDERS,
} from ".";
import { TGetOrdersResponse } from "../../utils/types";

export interface IWSConnectionUserOrdersStartAction {
  readonly type: typeof WS_CONNECTION_ORDERS_START;
  readonly payload: string;
}

export interface IWSConnectionUserOrdersSuccessAction {
  readonly type: typeof WS_CONNECTION_ORDERS_SUCCESS;
}

export interface IWSConnectionUserOrdersErrorAction {
  readonly type: typeof WS_CONNECTION_ORDERS_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionUserOrdersClosedAction {
  readonly type: typeof WS_CONNECTION_ORDERS_CLOSED;
}

export interface IWSConnectionUserOrdersClosedSuccessAction {
  readonly type: typeof WS_CONNECTION_ORDERS_CLOSED_SUCCESS;
}

export interface IWSConnectionGetUserOrdersAction {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly payload: TGetOrdersResponse;
}

export type TWSUserOrdersActions =
  | IWSConnectionUserOrdersStartAction
  | IWSConnectionUserOrdersSuccessAction
  | IWSConnectionUserOrdersErrorAction
  | IWSConnectionUserOrdersClosedAction
  | IWSConnectionUserOrdersClosedSuccessAction
  | IWSConnectionGetUserOrdersAction;

export const wsConnectionUserOrdersStartAction = (
  url: string
): IWSConnectionUserOrdersStartAction => {
  return {
    type: WS_CONNECTION_ORDERS_START,
    payload: url,
  };
};

export const wsConnectionUserOrdersSuccessAction =
  (): IWSConnectionUserOrdersSuccessAction => {
    return {
      type: WS_CONNECTION_ORDERS_SUCCESS,
    };
  };

export const wsConnectionUserOrdersErrorAction = (
  error: Event
): IWSConnectionUserOrdersErrorAction => {
  return {
    type: WS_CONNECTION_ORDERS_ERROR,
    payload: error,
  };
};

export const wsConnectionUserOrdersClosedAction =
  (): IWSConnectionUserOrdersClosedSuccessAction => {
    return {
      type: WS_CONNECTION_ORDERS_CLOSED_SUCCESS,
    };
  };

export const wsConnectionGetOrdersAction = (
  response: TGetOrdersResponse
): IWSConnectionGetUserOrdersAction => {
  return {
    type: WS_GET_USER_ORDERS,
    payload: response,
  };
};
