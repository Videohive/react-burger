import {
  WS_CONNECTION_ORDERS_CLOSED,
  WS_CONNECTION_ORDERS_ERROR,
  WS_CONNECTION_ORDERS_START,
  WS_CONNECTION_ORDERS_SUCCESS,
  WS_GET_USER_ORDERS,
} from "../actions";

import { TOrders } from "../../utils/types";
import { TWSUserOrdersActions } from "../actions/wsUserOrderActions";

type TWSState = {
  wsConnected: boolean;
  orders: TOrders;
  total: number;
  totalToday: number;
  loading: boolean;

  error?: Event;
};

export const initialState: TWSState = {
  wsConnected: false,
  orders: [],

  total: 0,
  totalToday: 0,
  loading: false,
};

export const wsUserOrdersReducer = (
  state = initialState,
  action: TWSUserOrdersActions
) => {
  switch (action.type) {
    case WS_CONNECTION_ORDERS_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case WS_CONNECTION_ORDERS_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ORDERS_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
        loading: false,
      };
    }
    case WS_CONNECTION_ORDERS_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        loading: false,
      };
    }

    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders ? action.payload.orders : state.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
