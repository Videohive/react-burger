import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';
import {
  thunk
} from 'redux-thunk';
import {
  rootReducer
} from './reducers/rootReducer';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_USER_ORDERS_START,
  WS_CONNECTION_USER_ORDERS_CLOSED,
  WS_CONNECTION_USER_ORDERS_CLOSED_SUCCESS,
  WS_CONNECTION_USER_ORDERS_ERROR,
  WS_CONNECTION_USER_ORDERS_SUCCESS,
  WS_GET_USER_ORDERS,
} from "./actions";

import { configureStore} from "@reduxjs/toolkit";

import { socketMiddleware } from "./middleware/socketMiddleware";
import { TWSOrderActions } from "./../utils/types";

const composeEnhancers =
    // @ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
  compose;

  const wsActions: TWSOrderActions = {
    wsInit: WS_CONNECTION_START,
    wsClose: WS_CONNECTION_CLOSED,
    onClose: WS_CONNECTION_CLOSED_SUCCESS,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS
};

const wsUserOrderActions: TWSOrderActions  = {
    wsInit:WS_CONNECTION_USER_ORDERS_START,
    wsClose: WS_CONNECTION_USER_ORDERS_CLOSED,
    onClose: WS_CONNECTION_USER_ORDERS_CLOSED_SUCCESS,
    onOpen: WS_CONNECTION_USER_ORDERS_SUCCESS,
    onError: WS_CONNECTION_USER_ORDERS_ERROR,
    onMessage: WS_GET_USER_ORDERS
};

const ordersMiddleware = socketMiddleware(wsActions);
const userOrdersMiddleware = socketMiddleware(wsUserOrderActions);

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ordersMiddleware,userOrdersMiddleware),
});
