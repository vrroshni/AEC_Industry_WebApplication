import axios from 'axios'
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

} from '../constants/adminConstants'

/* ---------------------------- Listing all users --------------------------- */
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_USERS_LIST_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/aecadmin/allUsers/',
            config
        )

        dispatch({
            type: ALL_USERS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_USERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/* --------------------- Changing status(block/unblock) --------------------- */
export const statuschange = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/aecadmin/statuschange/', { "id": id },
        config
    )

    dispatch({
        type: USER_STATUS_CHANGE,
    })


}

/* ---------------- Listing all profile verification requests --------------- */

export const list_profile_verification = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_PROFILEVERIFICATIONS_LIST_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/aecadmin/allprofile_verification_requests/',
            config
        )

        dispatch({
            type: ALL_PROFILEVERIFICATIONS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_PROFILEVERIFICATIONS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/* ----------------------- rejectng/verifying profiles ---------------------- */

export const profile_verified = (id) => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/aecadmin/profileverified/', { "id": id },
        config
    )

    dispatch({
        type: USER_PROFILEVERIFIED_SUCCESS,
    })


}

export const profile_rejected = (id) => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/aecadmin/profilerejected/', { "id": id },
        config
    )

    dispatch({
        type: USER_PROFILEREJECTED_SUCCESS,
    })


}