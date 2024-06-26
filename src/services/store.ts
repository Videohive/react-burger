import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_ORDERS_START,
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_CLOSED_SUCCESS,
  WS_CONNECTION_ORDERS_ERROR,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_GET_USER_ORDERS,
} from "./actions";

import { configureStore } from "@reduxjs/toolkit";

import { socketMiddleware } from "./middleware/socketMiddleware";
import { TWSOrderActions } from "./../utils/types";

const wsActions: TWSOrderActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSED,
  onClose: WS_CONNECTION_CLOSED_SUCCESS,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsUserOrderActions: TWSOrderActions = {
  wsInit: WS_CONNECTION_ORDERS_START,
  wsClose: WS_CONNECTION_ORDERS_CLOSED,
  onClose: WS_CONNECTION_ORDERS_CLOSED_SUCCESS,
  onOpen: WS_CONNECTION_ORDERS_SUCCESS,
  onError: WS_CONNECTION_ORDERS_ERROR,
  onMessage: WS_GET_USER_ORDERS,
};

const ordersMiddleware = socketMiddleware(wsActions);
const userOrdersMiddleware = socketMiddleware(wsUserOrderActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      thunk,
      ordersMiddleware,
      userOrdersMiddleware
    ),
});
