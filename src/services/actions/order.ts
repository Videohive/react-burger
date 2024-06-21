import { Dispatch } from "redux";
import request from "../../utils/request";

import {
  ORDER_ERROR,
  ORDER_SUCCESS,
  ORDER_REQUEST,
  CONSTRUCTOR_CLEAN
} from ".";

interface IOrderRequestAction {
  type: typeof ORDER_REQUEST;
}

interface IOrderSuccessAction {
  type: typeof ORDER_SUCCESS;
  id: number;
}

interface IOrderErrorAction {
  type: typeof ORDER_ERROR;
  error: string;
}

interface IConstructorCleanAction {
  type: typeof CONSTRUCTOR_CLEAN;
}

// Объединяем типы экшенов в один тип
export type TOrderActionTypes =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderErrorAction
  | IConstructorCleanAction;

// Определим тип для ингредиента
interface IIngredient {
  _id: string;
}

// Определим тип для order, который является массивом ингредиентов
type TOrder = IIngredient[];

export const postOrderAction = (): IOrderRequestAction => ({
  type: ORDER_REQUEST,
});

export const postOrderSuccessAction = (
  id: number
): IOrderSuccessAction => ({
  type: ORDER_SUCCESS,
  id,
});

export const postOrderErrorAction = (
  error: string
): IOrderErrorAction => ({
  type: ORDER_ERROR,
  error,
});

export const postConstructorCleanAction = (): IConstructorCleanAction => ({
  type: CONSTRUCTOR_CLEAN,
});

// Определим тип для функции makeOrder
export const makeOrder = (order: TOrder) => (dispatch: Dispatch<TOrderActionTypes>) => {
  const body = {
    ingredients: order.map(item => item._id)
  };
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: localStorage.getItem("accessToken") || "",
    }
  };

  dispatch(postOrderAction());

  request('orders', options)
    .then(data => {
      dispatch(postOrderSuccessAction(data.order.number));
      dispatch(postConstructorCleanAction());
    })
    .catch(error => {
      dispatch(postOrderErrorAction(error.message));
    });
};
