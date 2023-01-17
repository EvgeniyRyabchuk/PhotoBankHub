
const initialState = {
    user: null,
    isAuth: false,

    loading: true,
    error: null,

}

export const userReducer = (state= initialState, action) => {
    switch(action.type) {
        case UserActionTypes.LOGIN:
              return {...state, loading: true, error: null, }

        case UserActionTypes.LOGIN_SUCCESS:
            // client or creator will be filled.
            // this is depends on role
            const {user, client, creator} = action.payload;
            user.client = client;
            user.creator = creator;
            console.log(123);
            return {
                loading: false,
                error: null,
                user: user,
                isAuth: true,
            }

        case UserActionTypes.LOGIN_ERROR:
            return {
                loading: false,
                error: action.payload,
                user: null,
                isAuth: false,
            }

        case UserActionTypes.LOGOUT: {
            return {
                ...state,
                user: null,
                isAuth: false,
                loading: false,
            };
        }

        default:
            return {...state};
    }


}

export const UserActionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_USERS_SUCCESS',
    LOGIN_ERROR: 'LOGIN_USERS_ERROR',

    LOGOUT: 'LOGOUT'

}




