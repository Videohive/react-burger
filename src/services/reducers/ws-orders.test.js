import { wsReducer, initialState } from "./ws-orders";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
} from "../actions";

import { mockWSOrdersResponse } from "../../utils/mock-data";

describe('wsReducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_START', () => {
        const action = {
            type: WS_CONNECTION_START,
            wsUrl: 'string',
        };
            expect(wsReducer(undefined, action)).toEqual({
            ...initialState,
            loading: true,
        })
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS,
        };
        expect(wsReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true,
        })
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        const action = {
            type: WS_CONNECTION_ERROR,
            payload: 'error',
        };
        expect(wsReducer(undefined, action)).toEqual({
            ...initialState,
            error: action.payload,
            wsConnected: false,
            loading: false,
        });
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        const action = {
            type: WS_CONNECTION_CLOSED,
        };
        expect(wsReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: false,
            loading: false,
        })
    });

    it('should handle WS_GET_ORDERS', () => {
        const action = {
            type: WS_GET_ORDERS,
            payload: mockWSOrdersResponse,
        };
        expect(wsReducer(undefined, action)).toEqual({
            ...initialState,
            error: undefined,
            orders: action.payload.orders,
            total:  action.payload.total,
            totalToday:  action.payload.totalToday,
            loading: false,
        })
    });

});
