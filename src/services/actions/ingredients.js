import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
} from "./index";
import {
  API_URL
} from '../../utils/const'
import request from "../../utils/request";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST
    })

    request(API_URL).then(data => {
      if (data.success) {
        //console.log(data.data)
        dispatch({
          type: INGREDIENTS_SUCCESS,
          data: data.data
        })
      } else {
        dispatch({
          type: INGREDIENTS_FAILED
        })
      }
    }).catch(e => {
      dispatch({
        type: INGREDIENTS_FAILED
      })
    })
  }
}
