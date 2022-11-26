import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            console.log('Login   request')
            return { loading: true }
        
        case USER_LOGIN_SUCCESS:
            console.log('Login   success')

            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            console.log('Login   failed')

            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            console.log('Logout   ')

            return {}

        default:
            console.log('default')
            return state;
    }
}


