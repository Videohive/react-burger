import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
	data: ingredientsReducer,
	ingredients: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
  auth: authReducer
});
