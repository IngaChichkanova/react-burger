import * as types from '../constants/user';
import { userReducer } from './user';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                registerStart: false,
                registerError: false,
                registerErrorText: '',
                loginStart: false,
                loginError: false,
                loginErrorText: '',
                logoutStart: false,
                logoutError: false,
                forgotPasswordStart: false,
                forgotPasswordError: false,
                resetPasswordStart: false,
                resetPasswordError: false,
                getUserStart: false,
                getUserError: false,
                user: null,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false,
            }
        )
    })

    it('should handle REGISTER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.REGISTER_REQUEST,
            })
        ).toEqual({
            registerStart: true,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle REGISTER_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.REGISTER_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerError: !payloadData,
            registerStart: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle REGISTER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.REGISTER_FAILED,
                payload: 'error text'
            })
        ).toEqual({
            registerError: true,
            registerStart: false,
            registerErrorText: 'error text',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_IN_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.SIGN_IN_REQUEST,
            })
        ).toEqual({
            loginStart: true,
            loginError: false,
            loginErrorText: '',
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_IN_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.SIGN_IN_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            loginError: !payloadData,
            loginStart: false,
            loginErrorText: '',
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_IN_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.SIGN_IN_FAILED,
                payload: 'error text'
            })
        ).toEqual({
            loginError: true,
            loginErrorText: 'error text',
            loginStart: false,
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_OUT_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.SIGN_OUT_REQUEST,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: true,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_OUT_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.SIGN_OUT_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutError: !payloadData,
            logoutStart: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle SIGN_OUT_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.SIGN_OUT_FAILED,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutError: true,
            logoutStart: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: true,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.FORGOT_PASSWORD_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordError: !payloadData,
            forgotPasswordStart: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.FORGOT_PASSWORD_FAILED,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordError: true,
            forgotPasswordStart: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: true,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.RESET_PASSWORD_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordError: !payloadData,
            resetPasswordStart: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.RESET_PASSWORD_FAILED,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordError: true,
            resetPasswordStart: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.USER_REQUEST,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserRequest: true,
            getUserError: false,
            user: null,
            getUserRequest: true,
            getUserSuccess: false,
            getUserFailed: false,
            getUserStart: false,
        })
    })

    it('should handle USER_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.USER_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            getUserStart: false,
            resetPasswordError: false,
            getUserError: !payloadData,
            getUserRequest: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle USER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.USER_FAILED,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: true,
            getUserRequest: false,
            user: null,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(
            userReducer(undefined, {
                type: types.GET_USER_REQUEST,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserRequest: true,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        const payloadData = true;
        expect(
            userReducer(undefined, {
                type: types.GET_USER_SUCCESS,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserFailed: !payloadData,
            getUserSuccess: payloadData,
            getUserRequest: false
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect(
            userReducer(undefined, {
                type: types.GET_USER_FAILED,
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: null,
            getUserFailed: true,
            getUserSuccess: false,
            getUserRequest: false
        })
    })

    it('should handle SET_USER', () => {
        const payloadData = {
            email: 'string',
            name: 'string',
        };

        expect(
            userReducer(undefined, {
                type: types.SET_USER,
                payload: payloadData
            })
        ).toEqual({
            registerStart: false,
            registerError: false,
            registerErrorText: '',
            loginStart: false,
            loginError: false,
            loginErrorText: '',
            logoutStart: false,
            logoutError: false,
            forgotPasswordStart: false,
            forgotPasswordError: false,
            resetPasswordStart: false,
            resetPasswordError: false,
            getUserStart: false,
            getUserError: false,
            user: payloadData,
            getUserRequest: false,
            getUserSuccess: false,
            getUserFailed: false,
        })
    })

})