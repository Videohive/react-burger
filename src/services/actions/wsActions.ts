import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from ".";

import { TGetOrdersResponse } from "../../utils/types";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSConnectionClosedSuccessAction {
  readonly type: typeof WS_CONNECTION_CLOSED_SUCCESS;
}

export interface IWSConnectionGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TGetOrdersResponse;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSConnectionClosedSuccessAction
  | IWSConnectionGetOrdersAction;

export const wsConnectionStartAction = (
  url: string
): IWSConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccessAction = (): IWSConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorAction = (
  error: Event
): IWSConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const wsConnectionClosedAction =
  (): IWSConnectionClosedSuccessAction => {
    return {
      type: WS_CONNECTION_CLOSED_SUCCESS,
    };
  };

export const wsConnectionGetOrdersAction = (
  response: TGetOrdersResponse
): IWSConnectionGetOrdersAction => {
  return {
    type: WS_GET_ORDERS,
    payload: response,
  };
};
