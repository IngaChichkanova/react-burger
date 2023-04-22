import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { loginReducer } from './login';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  login: loginReducer
});