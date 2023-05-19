import { getIngedientsRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';


export function getIngedients() {
    return function (dispatch: Function) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngedientsRequest()
            .then(response => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    };
}