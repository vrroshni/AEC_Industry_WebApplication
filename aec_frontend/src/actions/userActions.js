import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
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





export const login = (username, password) => async (dispatch) => {

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('login/',
            { 'username': username, 'password': password }, config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data

        })
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const registeruser = (username, firstname, lastname, email, phonenumber, password,) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('register/',
            { 'username': username, 'firstname': firstname, 'lastname': lastname, 'password': password, 'email': email, 'phonenumber': phonenumber }, config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const profileverification = (user, role, location, experience, description, dob, website, id_image, cv_pdf, certi_pdf) => async (dispatch) => {
    try {

        dispatch({
            type: USER_PROFILEVERIFY_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('profileverification/',
            { 'user': user, 'role': role, 'location': location, 'experience': experience, 'website': website, 'description': description, 'dob': dob, 'certificate': certi_pdf, 'cv': cv_pdf, 'id_proof': id_image }, config
        )

        dispatch({
            type: USER_PROFILEVERIFY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_PROFILEVERIFY_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}



export const getUserProfile = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_PROFILE_REQUEST
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

        const { data } = await axios.get('/profile/', config
        )

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data

        })


    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const getUserRequest = () => async (dispatch, getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('userrequest/', config
        )

        dispatch({
            type: USER_PROFILEREQUEST_INDIVIDUAL_VIEW,
            payload: data

        })


    } catch (error) {
        dispatch({
            type: USER_PROFILEREQUEST_INDIVIDUAL_FAILED,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}






export const updateProfile = (username, firstname, lastname, email, phonenumber, pro_pic, cover_pic, password,) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch('/updateprofile/',
            { 'username': username, 'firstname': firstname, 'lastname': lastname, 'password': password, 'email': email, 'phonenumber': phonenumber, 'pro_pic': pro_pic, 'cover_pic': cover_pic, 'password': password }, config
        )
        console.log(data, '...................')
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const addPost = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ADD_POST_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('addpost/',
            {}, config
        )

        dispatch({
            type: USER_ADD_POST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_ADD_POST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const allFeed = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_FEED_ALL_POSTS_LIST_REQUEST
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

        const { data } = await axios.get('feed/',
            config
        )

        dispatch({
            type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_FEED_ALL_POSTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



