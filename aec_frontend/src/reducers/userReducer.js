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

    USER_LIKED_POST,
    USER_DISLIKED_POST,
    USER_COMMENTED,
    USER_COMMENT_REPLY,
    USER_INTERACTION_RESET,


    UNFOLLOW_FOLLOW_USER,
    SEND_CONNECTION_REQUEST,
    REJECT_CONNECTION_REQUEST,
    USER_NETWORK_RESET,

    ALL_USERS_REACTIONS,
    ALL_USERS_COMMENTS,
    ALL_USERS_COMMENTS_REPLY

} from '../constants/userConstants'


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

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
            return { result: null }


        default:
            return state;
    }
}


export const postAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_POST_REQUEST:
            return { loading: true }

        case USER_ADD_POST_SUCCESS:
            return { loading: false }

        case USER_ADD_POST_FAIL:
            return { loading: false, error: action.payload }

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


export const allUserReactionsReducer = (state = { reactions:[]}, action) => {
    switch (action.type) {
        case ALL_USERS_REACTIONS:
            return {
                reactions: action.payload
            }

        default:
            return state
    }
}
export const allcommentsReducer = (state = { comments:[]}, action) => {
    switch (action.type) {
       
        case ALL_USERS_COMMENTS:
            return {
                comments: action.payload
            }

        default:
            return state
    }
}
export const allcommentsreplyReducer = (state = {comment_reply:[] }, action) => {
    switch (action.type) {
        case ALL_USERS_COMMENTS_REPLY:
            return {
                comment_reply: action.payload
            }

        default:
            return state
    }
}



export const postInteractionReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIKED_POST:
            return {
                liked: true
            }

        case USER_DISLIKED_POST:
            return {
                disliked: true
            }

        case USER_COMMENTED:
            return {
                commented: true
            }

        case USER_COMMENT_REPLY:
            return {
                reply_commented: true
            }

        case USER_INTERACTION_RESET:
            return {}

        default:
            return state
    }
}


export const networkReducer = (state = {}, action) => {
    switch (action.type) {
        case UNFOLLOW_FOLLOW_USER:
            return {
                action: true
            }

        case SEND_CONNECTION_REQUEST:
            return {
                send: true
            }

        case REJECT_CONNECTION_REQUEST:
            return {
                reject: true
            }

        case USER_NETWORK_RESET:
            return {}

        default:
            return state
    }
}

