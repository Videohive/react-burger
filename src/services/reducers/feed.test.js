import {
  feedReducer,
  initialState
} from "./feed";

import {
  SET_CORRECT_ORDERS,
  SELECT_ORDER,
  UNSELECT_ORDER
} from '../actions';

describe('feedReducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CORRECT_ORDERS', () => {
    const action = {
      type: SET_CORRECT_ORDERS,
      payload: [{
        id: 1,
        name: 'Order 1'
      }],
    };
    const expectedState = {
      orders: [{
        id: 1,
        name: 'Order 1'
      }],
      selectedOrder: null,
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SELECT_ORDER', () => {
    const action = {
      type: SELECT_ORDER,
      payload: {
        id: 1,
        name: 'Order 1'
      },
    };
    const expectedState = {
      orders: [],
      selectedOrder: {
        id: 1,
        name: 'Order 1'
      },
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UNSELECT_ORDER', () => {
    const currentState = {
      orders: [],
      selectedOrder: {
        id: 1,
        name: 'Order 1'
      },
    };
    const action = {
      type: UNSELECT_ORDER,
    };
    const expectedState = {
      orders: [],
      selectedOrder: null,
    };
    expect(feedReducer(currentState, action)).toEqual(expectedState);
  });
});
