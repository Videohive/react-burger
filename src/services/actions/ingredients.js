import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_FAILED,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_ADD_BUN
} from "./index";

import request from "../../utils/request";
import { v4 as uuidv4 } from 'uuid';

export const addIngredient = (item) => {
    return {
        type: CONSTRUCTOR_ADD_INGREDIENT,
        item: {...item, uuid: uuidv4()}
    };
};

export const addBun = (item) => {
  return {
      type: CONSTRUCTOR_ADD_BUN,
      item: {...item, uuid: uuidv4()}
  };
};

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({ type: INGREDIENTS_REQUEST });

    request('/ingredients')
      .then(data => {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          data: data.data
        });
      })
      .catch(error => {
        dispatch({
          type: INGREDIENTS_FAILED,
          error: error.message
        });
      });
  };
};
