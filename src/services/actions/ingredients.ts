import { getIngedientsRequest } from "../../utils/burger-api";
import { AppDispatch, AppThunkAction, TIngredient } from '../../utils/types';

import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from '../constants/ingredients';

export interface IIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: ReadonlyArray<TIngredient>;
}

export type TIngredientsAction =
    | IIngredientsFailedAction
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    ;

export function getIngedients(): AppThunkAction {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngedientsRequest()
            .then(response => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: response.data ? response.data : []
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    };
}