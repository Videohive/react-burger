export const initialState = {
  data: {
    ingredients: [],
    isLoading: false,
    hasError: false,
  },

  ingredients: {
    bun: null,
    main: []
  },

  details: {},

  order: {
    id: 0,
    isLoaded: false,
    hasError: false,
  }
}
