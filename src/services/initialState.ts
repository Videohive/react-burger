import { TIngredient, TConstructorProps } from "../utils/types";

export type TInitialState = {
  data: {
    ingredients: TIngredient[],
    isLoading: boolean,
    hasError: boolean,
  },

  ingredients: {
    bun: TConstructorProps | null,
    main: TConstructorProps[],
  },

  details: {},

  order: {
    id: number,
    isLoading: boolean,
    hasError: boolean,
  },
};

export const initialState: TInitialState = {
  data: {
    ingredients: [],
    isLoading: false,
    hasError: false,
  },

  ingredients: {
    bun: null,
    main: [],
  },

  details: {},

  order: {
    id: 0,
    isLoading: false,
    hasError: false,
  },
};
