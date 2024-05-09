import request from "../../utils/request";
import {
  ORDER_URL
} from "../../utils/const";

import {
  ORDER_ERROR,
  ORDER_SUCCESS,
  ORDER_REQUEST
} from "./"

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

  request(ORDER_URL, options).then(data => {
    if (data.success) {
      dispatch({
        type: ORDER_SUCCESS,
        id: data.order.number,
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
