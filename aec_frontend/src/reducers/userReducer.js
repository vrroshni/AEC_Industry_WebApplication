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

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_ADD_POST_REQUEST,
    USER_ADD_POST_SUCCESS,
    USER_ADD_POST_FAIL,
    USER_ADD_POST_RESET,


    USER_FEED_ALL_POSTS_LIST_REQUEST,
    USER_FEED_ALL_POSTS_LIST_SUCCESS,
    USER_FEED_ALL_POSTS_LIST_FAIL,

    USER_PROFILEREQUEST_INDIVIDUAL_VIEW,
    USER_PROFILEREQUEST_INDIVIDUAL_FAILED,

} from '../constants/userConstants'


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}

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
            return { loading: false, status: true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload, status: false }
        default:
            return state;
    }
}



export const getUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }

        case USER_PROFILE_SUCCESS:
            return { loading: false, fullUserProfileInfo: action.payload, status: true }

        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload, status: false }


        default:
            return state;
    }
}


export const profileverificationReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILEVERIFY_REQUEST:
            return { loading: true }

        case USER_PROFILEVERIFY_SUCCESS:
            return { loading: false, fullProfileInfo: action.payload, status: true }

        case USER_PROFILEVERIFY_FAIL:
            return { loading: false, error: action.payload, status: false }

        case USER_PROFILEREQUEST_INDIVIDUAL_VIEW:
            return { prof_request: action.payload }

        case USER_PROFILEREQUEST_INDIVIDUAL_FAILED:
            return { prof_request_error: action.payload }
        default:
            return state;
    }
}



export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, result: true }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, updateerror: action.payload, result: false }

        case USER_UPDATE_PROFILE_RESET:
            return {result:null}


        default:
            return state;
    }
}


export const postAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_POST_REQUEST:
            return { loading: true }

        case USER_ADD_POST_SUCCESS:
            return { loading: false, addedpost: action.payload,added:true }

        case USER_ADD_POST_FAIL:
            return { loading: false, error: action.payload,added:false }

        case USER_ADD_POST_RESET:
            return {}

        default:
            return state;
    }
}



export const FeedReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case USER_FEED_ALL_POSTS_LIST_REQUEST:
            return { loading: true, posts: [] }

        case USER_FEED_ALL_POSTS_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
            }

        case USER_FEED_ALL_POSTS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

