import {store} from './store'
import {TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  rootReducer
} from './reducers/rootReducer';

import { TForgotPasswordActions } from './actions/forgot-password';
import { TIngredientDetailsActions } from './actions/ingredient-details';
import { TIngredientsActions } from './actions/ingredients';
import { TLoginActions } from './actions/login';
import { TProfileActions } from './actions/profile';
import { TOrderActionTypes } from './actions/order';
import { TRegisterActions } from './actions/register';
import { TResetPasswordActions } from './actions/reset-password';
import { TConstructorActions } from './actions/constructor-item';

type TAppActions =
    | TForgotPasswordActions
    | TIngredientDetailsActions
    | TIngredientsActions
    | TLoginActions
    | TProfileActions
    | TOrderActionTypes
    | TRegisterActions
    | TResetPasswordActions
    | TConstructorActions

export type AppStore = typeof store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
