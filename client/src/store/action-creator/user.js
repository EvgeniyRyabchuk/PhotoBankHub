import {UserActionTypes} from "../reducers/userReducer";
import AuthService from "../../services/AuthService";

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        try {
            dispatch({type: UserActionTypes.LOGIN})
            const logInResponse = await AuthService.login(email, password);

            localStorage.setItem('access_token', logInResponse.data.access_token)

            if(rememberMe)
                localStorage.setItem('refresh_token', logInResponse.data.refresh_token)

            const profileResponse = await AuthService.profile();

            dispatch({type: UserActionTypes.LOGIN_SUCCESS, payload: profileResponse.data});
        }
        catch(err) {
            dispatch({type: UserActionTypes.LOGIN_ERROR,
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message}); 
        }
    }
}

export const register = (newUser) => {
    return async (dispatch) => {
        try {
            const registerResponse = await AuthService.register(newUser);
        }
        catch(err) {
            dispatch({type: UserActionTypes.LOGIN_ERROR,
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message});
        }
    }
}

export const profile = (email, password) => {
    return async (dispatch) => {
        try {
            const profileResponse = await AuthService.profile();
            dispatch({type: UserActionTypes.LOGIN_SUCCESS, payload: profileResponse.data});
        }
        catch(err) {
            dispatch({type: UserActionTypes.LOGIN_ERROR,
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message});
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            const profileResponse = await AuthService.logout();

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            dispatch({type: UserActionTypes.LOGOUT});
        }
        catch(err) {
            dispatch({type: UserActionTypes.LOGIN_ERROR,
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message});
        }
    }
}


