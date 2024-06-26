import { ReactElement } from "react";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
  WS_CONNECTION_CLOSED_SUCCESS,
  WS_GET_USER_ORDERS,
  WS_CONNECTION_ORDERS_START,
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_ERROR,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_CONNECTION_ORDERS_CLOSED_SUCCESS,
} from "../services/actions/";

export type TProfile = {
  name: string;
  email: string;
  password: string;
};

export type TUserResponse = {
  name: string;
  email: string;
};

export type TOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export type TSuccessResponse = {
  success: boolean;
  [key: string]: any;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
};

export type TConstructorItem = TIngredient & {
  uuid: string;
  isLocked?: boolean;
};

export type TConstructorProps = TConstructorItem & {
  position?: number;
  isTop?: boolean;
  isBottom?: boolean;
};

export type TModal = {
  title?: string;
  children: ReactElement;
  onClose: () => void;
};

export type TRegister = Pick<TProfile, "name" | "email" | "password">;
export type TLogin = Pick<TProfile, "email" | "password">;
export type TUserData = Pick<TProfile, "name" | "email">;
export type TForgotPassword = Pick<TProfile, "email">;
export type TResetPassword = Pick<TProfile, "password"> & { token: string };

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number?: number;
};

export type TOrders = TOrder[];

export type TGetOrdersResponse = {
  success: boolean;
  orders: TOrders;
  total: number;
  totalToday: number;
};

export type TCorrectOrder = Omit<TOrder, "ingredients"> & {
  ingredients: TIngredient[];
};

export type TDoneInProgressOrders = {
  done: number[];
  inProgress: number[];
};

export type TWSOrderActions = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_ORDERS_START;
  wsClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_ORDERS_CLOSED;
  onClose:
    | typeof WS_CONNECTION_CLOSED_SUCCESS
    | typeof WS_CONNECTION_ORDERS_CLOSED_SUCCESS;
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_ORDERS_SUCCESS;
  onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_ORDERS_ERROR;
  onMessage: typeof WS_GET_ORDERS | typeof WS_GET_USER_ORDERS;
};
