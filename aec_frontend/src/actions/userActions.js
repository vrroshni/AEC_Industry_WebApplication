import axios from 'axios'
import { toast } from 'react-toastify'
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
    USER_ALL_SUGGESTIONS,

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


    TO_PREMIUM_REQUEST,
    TO_PREMIUM_SUCCESS,
    TO_PREMIUM_FAILED,
    TO_PREMIUM_RESET,

    OTHER_USER_PROFILE_REQUEST,
    OTHER_USER_PROFILE_SUCCESS,
    OTHER_USER_PROFILE_FAIL,

    USER_CONNECT_US_REQUEST,
    USER_CONNECT_US_SUCCESS,
    USER_CONNECT_US_FAIL,

    USER_CONNECT_LIST_ALL_REQUEST,
    USER_CONNECT_LIST_ALL_SUCCESS,
    USER_CONNECT_LIST_ALL_FAIL,
    USER_CONNECT_LIST_ALL_RESET,
    USER_PROPOSAL_BIDS_ALL_REQUEST,
    USER_PROPOSAL_BIDS_ALL_SUCCESS,
    USER_PROPOSAL_BIDS_ALL_FAIL



} from '../constants/userConstants'
import storage from 'redux-persist/lib/storage'
import { persistor } from '../index';







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

        const { data } = await axios.post('/login/',
            { 'username': username, 'password': password }, config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data

        })
        toast.success(' You have logged in succesfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
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
    localStorage.clear()
    localStorage.removeItem('userInfo')
    localStorage.removeItem('persist:root')
    storage.removeItem('persist:root')
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge();
    });
    dispatch({ type: USER_LOGOUT })
    toast.success(' You have logged out succesfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    window.location.reload()
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
        toast.success(' You have registered succesfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
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

export const connectUs = (role, location,requirementdetails, experience,related) => async (dispatch,getState) => {
    try {

        dispatch({
            type: USER_CONNECT_US_REQUEST
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
        const { data } = await axios.post('connectus/',{'request_from':userInfo.id,'role':role,'location':location,'requirementdetails':requirementdetails,'experience':experience,'related':related},config)

        dispatch({
            type: USER_CONNECT_US_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_CONNECT_US_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const topremium = (premium_amount) => async (dispatch, getState) => {
    try {

        dispatch({
            type: TO_PREMIUM_REQUEST
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

        const { data } = await axios.patch(' /topremium/', { "premium_amount": premium_amount }, config
        )
        console.log(data, '...................')
        dispatch({
            type: TO_PREMIUM_SUCCESS,
        })
        
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: TO_PREMIUM_FAILED,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })

        dispatch({
            type: TO_PREMIUM_RESET,
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

export const getOtherUserProfile = (user_id) => async (dispatch, getState) => {
    console.log(user_id, 'iddddddddddddddd')
    try {

        dispatch({
            type: OTHER_USER_PROFILE_REQUEST
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
        console.log(user_id, 'iddddddddddddddd')

        const { data } = await axios.post('/otheruserprofile/', { "id": user_id }, config)

        dispatch({
            type: OTHER_USER_PROFILE_SUCCESS,
            payload: data

        })


    } catch (error) {
        dispatch({
            type: OTHER_USER_PROFILE_FAIL,
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
export const getUserAllConnectUsRequest = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_CONNECT_LIST_ALL_REQUEST,
           

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

        const { data } = await axios.get('connectusrequests/', config
        )

        dispatch({
            type: USER_CONNECT_LIST_ALL_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: USER_CONNECT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}
export const getUserAllProposalBids = () => async (dispatch, getState) => {

    try {

        dispatch({
            type: USER_PROPOSAL_BIDS_ALL_REQUEST,
           

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

        const { data } = await axios.get('proposalbids/', config
        )

        dispatch({
            type: USER_PROPOSAL_BIDS_ALL_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: USER_PROPOSAL_BIDS_ALL_FAIL,
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
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
        })
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data

        })
        toast.success(' Profile details are updated Succesffully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const addPost = (post_desc, image, video) => async (dispatch, getState) => {
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
            { 'post_desc': post_desc, 'image': image, 'video': video }, config
        )

        dispatch({
            type: USER_ADD_POST_SUCCESS,
        })

        dispatch({
            type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
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

        const { data } = await axios.get('allfeed/',
            config
        )

        dispatch({
            type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
            payload: data.allposts
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



export const post_like = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.patch('/user/like_post/', { 'id': id }, config
    )

    dispatch({
        type: USER_LIKED_POST,

    })

    dispatch({
        type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
        payload: data.allposts
    })


}

export const suggestionslist = () => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get('/suggestions/', config
    )

    dispatch({
        type: USER_ALL_SUGGESTIONS,
        payload: data
    })




}


export const post_dislike = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.patch('/user/dislike_post/', { 'id': id }, config
    )

    dispatch({
        type: USER_DISLIKED_POST,
    })

    dispatch({
        type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
        payload: data.allposts
    })

}

export const user_commented = (post_id, comment) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post('/user/user_commented/', { 'post_id': post_id, 'comment': comment }, config
    )

    dispatch({
        type: USER_COMMENTED,
    })

    dispatch({
        type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
        payload: data.allposts
    })

}

export const user_comment_reply = (post_id, comment_id, comment) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/user/user_comment_reply/', { 'post_id': post_id, 'comment_id': comment_id, 'comment': comment }, config
    )

    dispatch({
        type: USER_COMMENT_REPLY,
    })

    dispatch({
        type: USER_FEED_ALL_POSTS_LIST_SUCCESS,
        payload: data.allposts
    })

}

export const follow_unfollow = (user_id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/user/follow_unfollow/', { 'user_id': user_id, }, config
    )

    dispatch({
        type: UNFOLLOW_FOLLOW_USER,
    })
    dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data

    })



}

export const send_connection = (user_id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/user/send_connection/', { 'user_id': user_id, }, config
    )

    dispatch({
        type: SEND_CONNECTION_REQUEST,
    })
}

export const reject_connection = (user_id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/user/reject_connection/', { 'user_id': user_id, }, config
    )

    dispatch({
        type: REJECT_CONNECTION_REQUEST,
    })
}

export const accept_connection = (user_id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put('/user/accept_connection/', { 'user_id': user_id, }, config
    )

    dispatch({
        type: REJECT_CONNECTION_REQUEST,
    })
}
