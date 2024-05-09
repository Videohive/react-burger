import request from "../../utils/request";
import {
  BASE_URL
} from "../../utils/const";

import {
  ORDER_ERROR,
  ORDER_SUCCESS,
  ORDER_REQUEST
} from "./";

import { CONSTRUCTOR_CLEAN } from "../actions";

export const makeOrder = (order) => (dispatch) => {
  const body = {
    ingredients: order.map((item) => {
      return item._id
    })
  };
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  dispatch({
    type: ORDER_REQUEST
  })

  request(BASE_URL + '/orders', options).then(data => {
    if (data.success) {
      dispatch({
        type: ORDER_SUCCESS,
        id: data.order.number,
      })
      dispatch({
        type: CONSTRUCTOR_CLEAN,
      })
    } else {
      dispatch({
        type: ORDER_ERROR
      })
    }
  }).catch(e => {
    dispatch({
      type: ORDER_ERROR
    })
  })
}
