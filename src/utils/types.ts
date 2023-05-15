export type TRootState<TKey extends string = ''> = {
    [key in TKey]: any;
};

export interface ICheckResponse<T> extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    json(): Promise<T>;
}

export type TActionUser = {
    type: 'REGISTER_REQUEST' | 'REGISTER_SUCCESS' | 'REGISTER_FAILED' | 'SIGN_IN_REQUEST' | 'SIGN_IN_SUCCESS' | 'SIGN_IN_FAILED' | 'SIGN_OUT_REQUEST' | 'SIGN_OUT_SUCCESS' | 'SIGN_OUT_FAILED' | 'FORGOT_PASSWORD_REQUEST' | 'FORGOT_PASSWORD_SUCCESS' | 'FORGOT_PASSWORD_FAILED' | 'RESET_PASSWORD_REQUEST' | 'RESET_PASSWORD_SUCCESS' | 'RESET_PASSWORD_FAILED' | 'USER_REQUEST' | 'USER_SUCCESS' | 'USER_FAILED' | 'SET_USER' | 'GET_USER_REQUEST' | 'GET_USER_SUCCESS' | 'GET_USER_FAILED';
    payload?: string | boolean;
};

export type TActionOrder = {
    type: 'GET_ORDER_REQUEST' | 'GET_ORDER_SUCCESS' | 'GET_ORDER_FAILED';
    payload?: null | TIngredient;
};

export type TActionLogin = {
    type: 'SET_USER' | 'GET_USER_REQUEST' | 'GET_USER_SUCCESS' | 'GET_USER_FAILED';
    payload?: null | TUser;
};

export type TActionIngredient = {
    type: 'GET_INGREDIENTS_FAILED' | 'GET_INGREDIENTS_REQUEST' | 'GET_INGREDIENTS_SUCCESS';
    payload?: Array<TIngredient>;
};

export type TActionIngredientModal = {
    type: 'CURRENT_INGREDIENT';
    payload?: null | TIngredient;
};

export type TActionBurberConstructor = {
    type: 'CURRENT_INGREDIENTS_LIST';
    payload?: Array<TIngredient>;
};

export type TUserRoot = {
    registerStart: boolean;
    registerError: boolean;
    registerErrorText: string;
    loginStart: boolean;
    loginError: boolean;
    loginErrorText: string;
    logoutStart: boolean;
    logoutError: boolean;
    forgotPasswordStart: boolean;
    forgotPasswordError: boolean;
    resetPasswordStart: boolean;
    resetPasswordError: boolean;
    getUserStart: boolean;
    getUserError: boolean;
    user: null | TUser;
    getUserRequest: boolean;
    getUserSuccess: boolean;
    getUserFailed: boolean;
};

export type TUser = {
    email: string;
    name: string;
};

export type TIngredientsRoot = {
    currentIngredientsList: Array<TIngredient>
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