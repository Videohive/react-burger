import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./ws-orders";
import { feedReducer } from "./feed";
import { wsUserOrdersReducer } from "./ws-user-orders";

export const rootReducer = combineReducers({
	data: ingredientsReducer,
	ingredients: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
  auth: authReducer,
  ws: wsReducer,
  feed: feedReducer,
  userOrders: wsUserOrdersReducer
});
