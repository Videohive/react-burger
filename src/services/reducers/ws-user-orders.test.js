import { wsUserOrdersReducer, initialState } from "./ws-user-orders";
import {
    WS_CONNECTION_ORDERS_CLOSED,
    WS_CONNECTION_ORDERS_ERROR,
    WS_CONNECTION_ORDERS_START,
    WS_CONNECTION_ORDERS_SUCCESS,
    WS_GET_USER_ORDERS,
} from "../actions";
import { mockWSOrdersResponse } from "../../utils/mock-data";

describe('wsUserOrdersReducer', () => {
    it('should return the initial state', () => {
        expect(wsUserOrdersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle  WS_CONNECTION_ORDERS_START', () => {
        const action = {
            type:  WS_CONNECTION_ORDERS_START,
            wsUrl: 'string',
        };
            expect(wsUserOrdersReducer(undefined, action)).toEqual({
            ...initialState,
            loading: true,
        })
    });

    it('should handle  WS_CONNECTION_ORDERS_SUCCESS', () => {
        const action = {
            type:  WS_CONNECTION_ORDERS_SUCCESS,
        };
        expect(wsUserOrdersReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true,
        })
    });

    it('should handle  WS_CONNECTION_ORDERS_ERROR', () => {
        const action = {
            type: WS_CONNECTION_ORDERS_ERROR,
            payload: 'error',
        };
        expect(wsUserOrdersReducer(undefined, action)).toEqual({
            ...initialState,
            error: action.payload,
            wsConnected: false,
            loading: false,
        });
    });

    it('should handle WS_CONNECTION_ORDERS_CLOSED', () => {
        const action = {
            type: WS_CONNECTION_ORDERS_CLOSED,
        };
        expect(wsUserOrdersReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: false,
            loading: false,
        })
    });

    it('should handle WS_GET_USER_ORDERS', () => {
        const action = {
            type: WS_GET_USER_ORDERS,
            payload: mockWSOrdersResponse,
        };
        expect(wsUserOrdersReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            loading: false,
        })
    });

});
