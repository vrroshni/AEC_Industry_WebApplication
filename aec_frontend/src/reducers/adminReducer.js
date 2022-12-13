import {
    ALL_USERS_LIST_REQUEST,
    ALL_USERS_LIST_SUCCESS,
    ALL_USERS_LIST_FAIL,

    USER_STATUS_CHANGE,

    ALL_PROFILEVERIFICATIONS_LIST_REQUEST,
    ALL_PROFILEVERIFICATIONS_LIST_SUCCESS,
    ALL_PROFILEVERIFICATIONS_LIST_FAIL,

    USER_PROFILEVERIFIED_SUCCESS,
    USER_PROFILEREJECTED_SUCCESS,

    ALL_POSTS_LIST_REQUEST,
    ALL_POSTS_LIST_SUCCESS,
    ALL_POSTS_LIST_FAIL,

    CHANGE_REPORT_STATUS,




} from '../constants/adminConstants'


export const allUserListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_LIST_REQUEST:
            return { loading: true, users: [] }

        case ALL_USERS_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload,
            }

        case ALL_USERS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const statusChangeReducer = (state = { }, action) => {
    switch (action.type) {

        case USER_STATUS_CHANGE:
            return { done: true }

        default:
            return state
    }
}
export const changeReportStatusReducer = (state = { }, action) => {
    switch (action.type) {

        case CHANGE_REPORT_STATUS:
            return { done: true }

        default:
            return state
    }
}



export const allProfileRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case ALL_PROFILEVERIFICATIONS_LIST_REQUEST:
            return { loading: true, requests: [] }

        case ALL_PROFILEVERIFICATIONS_LIST_SUCCESS:
            return {
                loading: false,
                requests: action.payload,
            }

        case ALL_PROFILEVERIFICATIONS_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_PROFILEVERIFIED_SUCCESS:
            return { verified:true }

        case USER_PROFILEREJECTED_SUCCESS:
            return {rejected:true }
        
        
        

        default:
            return state
    }
}


export const allPostListReducer = (state = { allposts: [] }, action) => {
    switch (action.type) {
        case ALL_POSTS_LIST_REQUEST:
            return { loading: true, allposts: [] }

        case ALL_POSTS_LIST_SUCCESS:
            return {
                loading: false,
                allposts: action.payload,
            }

        case ALL_POSTS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

