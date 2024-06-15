import {ReactElement} from "react";

export type TProfile = {
  name: string;
  email: string;
  password: string;
}

export type TUserResponse = {
  name: string;
  email: string;
}

export type TResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
}

export type TOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export type TSuccessResponse = {
  success: boolean;
  [key: string]: any;
}

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorItem = TIngredient & {
  uuid: string;
  isLocked?:boolean
}

export type TModal = {
  title?: string;
  children: ReactElement;
  onClose: () => void;
};

export type TRegister = Pick<TProfile, 'name' | 'email' | 'password'>
export type TLogin = Pick<TProfile, 'email' | 'password'>
export type TForgotPassword = Pick<TProfile, 'email'>
export type TResetPassword = Pick<TProfile, 'password'> & { token: string };
