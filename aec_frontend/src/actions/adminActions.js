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

    ALL_CLIENT_REQUIREMENTS_REQUEST,
    ALL_CLIENT_REQUIREMENTS_SUCCESS,
    ALL_CLIENT_REQUIREMENTS_FAIL,

    USER_CLIENT_REQUIREMNT_SHARED_SUCCESS,
    USER__CLIENT_REQUIREMNT_REJECTED,

    CHANGE_REPORT_STATUS,

} from '../constants/adminConstants'
import { toast } from 'react-toastify'


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
    toast.success(' Action is performed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
    toast.success(' Yiu have verified a profile!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
    toast.success(' You have rejected a profile ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })


}


export const listPosts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_POSTS_LIST_REQUEST
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

        const { data } = await axios.get('/aecadmin/allPosts/',
            config
        )

        dispatch({
            type: ALL_POSTS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_POSTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const changeReportStatus = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/aecadmin/changeReportStatus/', { "id": id },
        config
    )

    dispatch({
        type: CHANGE_REPORT_STATUS,
    })
    toast.success(' Action is performed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })


}



/* ---------------- Listing all Client Requirements requests --------------- */

export const list_client_requirements = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_CLIENT_REQUIREMENTS_REQUEST
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

        const { data } = await axios.get('/aecadmin/allclient_requirements/',
            config
        )

        dispatch({
            type: ALL_CLIENT_REQUIREMENTS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ALL_CLIENT_REQUIREMENTS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/* ----------------------- requiremnt sharing/rejecting profiles ---------------------- */

export const requirement_shared = (id) => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post('/aecadmin/requirement_shared/', { "id": id },
        config
    )

    dispatch({
        type: USER_CLIENT_REQUIREMNT_SHARED_SUCCESS,
    })
    toast.success(data.meassge.detail, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

}

export const requirement_rejected = (id) => async (dispatch, getState) => {
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/aecadmin/requirement_rejected/', { "id": id },
        config
    )

    dispatch({
        type: USER__CLIENT_REQUIREMNT_REJECTED,
    })
    toast.success(' You have rejected a Proposal ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })


}


