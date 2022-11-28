import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_PROFILEVERIFY_REQUEST,
    USER_PROFILEVERIFY_SUCCESS,
    USER_PROFILEVERIFY_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload,status:true }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload,status:false }

        case USER_LOGOUT:
            return {}

        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false,status:true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload,status:false }


        default:
            return state;
    }
}


export const profileverificationReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILEVERIFY_REQUEST:
            return { loading: true }

        case USER_PROFILEVERIFY_SUCCESS:
            return { loading: false,fullProfileInfo: action.payload,status:true }

        case USER_PROFILEVERIFY_FAIL:
            return { loading: false, error: action.payload,status:false }

        // case USER_PROFILEVERIFIED_SUCCESS:
        //     return { loading: false, error: action.payload }
        default:
            return state;
    }
}