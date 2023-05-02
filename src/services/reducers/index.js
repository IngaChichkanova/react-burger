import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burder-constructor';
import { ingredientModalReducer } from './ingredient-modal';
import { userReducer } from './user';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientModal: ingredientModalReducer,
  order: orderReducer
});