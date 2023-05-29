import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../index';
import { TBurgerConstructorActions } from '../services/actions/burder-constructor';
import { TIngredientModalAction } from '../services/actions/ingredient-modal';
import { TIngredientsAction } from '../services/actions/ingredients';
import { TOrderAction } from '../services/actions/order';
import { TUserAction } from '../services/actions/user';

type TApplicationActions = | TBurgerConstructorActions | TIngredientModalAction | TIngredientsAction | TOrderAction | TUserAction;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type TUser = {
    email: string;
    name: string;
};

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
    uniqueKey?: string;
};

export type TOrder = {
    createdAt: string;
    ingredients: Array<TIngredient>;
    name: string;
    number: number;
    owner: TOwner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string
};

export type TOwner = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
};

export type TOrderTrack = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};