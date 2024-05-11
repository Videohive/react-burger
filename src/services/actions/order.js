import request from "../../utils/request";

import {
  ORDER_ERROR,
  ORDER_SUCCESS,
  ORDER_REQUEST
} from "./";

import { CONSTRUCTOR_CLEAN } from "../actions";

export const makeOrder = (order) => (dispatch) => {
  const body = {
    ingredients: order.map(item => item._id)
  };
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };

  dispatch({ type: ORDER_REQUEST });

  request('/orders', options)
    .then(data => {
      dispatch({ type: ORDER_SUCCESS, id: data.order.number });
      dispatch({ type: CONSTRUCTOR_CLEAN });
    })
    .catch(error => {
      dispatch({
        type: ORDER_ERROR,
        error: error.message
      });
    });
};
