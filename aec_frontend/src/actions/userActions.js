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
    USER_PROPOSAL_BIDS_ALL_FAIL,

    USER_ACCEPT_PROPOSAL_REQUEST,
    USER_ACCEPT_PROPOSAL_BID,
    USER_ACCEPT_PROPOSAL_BIDS_FAIL,
    PROPOSAL_BID_RESET,


    USER_REJECT_BID,
    USER_REJECT_BID_ALL,

    ADD_REVIEW_PROJECT_REQUEST,
    ADD_REVIEW_PROJECT,
    ADD_REVIEW_RESET,
    ADD_REVIEW_FAIL,



    USER_ADD_PROJECT_REQUEST,
    USER_ADD_PROJECT_SUCCESS,
    USER_ADD_PROJECT_FAIL,


    USER_REGISTER_ACCOUNT_VERIFICATION_REQUEST,
    USER_REGISTER_ACCOUNT_VERIFICATION_EMAIL_OTP,
    USER_REGISTER_ACCOUNT_VERIFICATION_EMAIL_LINK,
    USER_REGISTER_ACCOUNT_VERIFICATION_FAIL,


    CHAT_FROM_PROFILE,
    CHAT_FROM_PROFILE_RESET,

    GET_USER_CHAT_LIST_,
    GET_CHAT,
    ADD_TO_CHAT_LIST_

} from '../constants/userConstants'
import storage from 'redux-persist/lib/storage'
import { persistor } from '../index';
import jwt_decode from 'jwt-decode'



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

export const googleSignin = (e) => async (dispatch) => {
    let lastname=null
    try {

        console.log('google signinn..........')
        console.log(e, 'event')
        var userObject = jwt_decode(e.credential)
        console.log(userObject, 'from googleeeee')



        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        console.log(userObject.family_name,'kkkkkkkkkkk')
        if (userObject.family_name === undefined) {
            lastname = userObject.given_name
        }else{
           lastname = userObject.family_name
        }
        axios.post('googleSignIn/',
            { 'firstname': userObject.given_name, 'lastname': lastname, 'username': userObject.name, "email": userObject.email, 'password': userObject.sub, "pro_pic": userObject.picture }, config
        ).then((googledata) => {
            console.log(googledata, 'kkkkkkkkkk')
            if (googledata.status == 200) {
                axios.post('/login/',
                    { 'username': userObject.name, 'password': userObject.sub, }, config
                ).then((data) => {
                    console.log(data, 'ffffffffffffff')
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: data.data

                    })
                    localStorage.setItem('userInfo', JSON.stringify(data))
                })


            }

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
        })




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
export const account_verify_otp = (userid, otp) => async (dispatch) => {
    try {


        dispatch({
            type: USER_REGISTER_ACCOUNT_VERIFICATION_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        console.log(userid, 'kkkkkkkkkkkkkkkkkkkk')
        const { data } = await axios.patch('/account_verify_otp/',
            { otp, userid }, config
        )

        dispatch({

            type: USER_REGISTER_ACCOUNT_VERIFICATION_EMAIL_OTP,

        })
        toast.info(data.detail, {
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
            type: USER_REGISTER_ACCOUNT_VERIFICATION_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}
export const account_verify_link = (userid, token) => async (dispatch) => {
    try {


        dispatch({
            type: USER_REGISTER_ACCOUNT_VERIFICATION_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.patch('/email_verify/',
            { userid, token }, config
        )

        dispatch({

            type: USER_REGISTER_ACCOUNT_VERIFICATION_EMAIL_LINK,

        })

        toast.info(data.detail, {
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
            type: USER_REGISTER_ACCOUNT_VERIFICATION_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
        console.log(error.response.data.detail, 'kkkkkkkkkkkkkkkkkkkkk')
        toast.error(error.response.data.detail, {
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
}
export const resend_otp = (userid) => async (dispatch) => {
    try {


        dispatch({
            type: USER_REGISTER_ACCOUNT_VERIFICATION_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        console.log(userid, 'kkkkkkkkkkkkkkkkkkkk')
        const { data } = await axios.patch('/resend_verification_credentials/',
            { userid }, config
        )

        dispatch({

            type: USER_REGISTER_ACCOUNT_VERIFICATION_EMAIL_OTP,

        })
        toast.info('New credentials send Succesffully Check your gmail!', {
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
            type: USER_REGISTER_ACCOUNT_VERIFICATION_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const registeredUserDetails = (userid) => async (dispatch, getState) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    const { data } = await axios.get(`/registereduser/${userid}/`, config
    )

    dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data
    })


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
            payload: data
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
        toast.info(' Check your gmail!', {
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

export const connectUs = (role, location, requirementdetails, experience, related) => async (dispatch, getState) => {
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
        const { data } = await axios.post('connectus/', { 'request_from': userInfo.id, 'role': role, 'location': location, 'requirementdetails': requirementdetails, 'experience': experience, 'related': related }, config)

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
                'Content-type': 'application/json',
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
            payload: data
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

export const acceptbid = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ACCEPT_PROPOSAL_REQUEST
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

        const { data } = await axios.patch('/accept_proposalbid/', { "id": id }, config
        )
        dispatch({
            type: USER_ACCEPT_PROPOSAL_BID,
        })

        dispatch({
            type: USER_ACCEPT_PROPOSAL_BIDS_FAIL,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ACCEPT_PROPOSAL_BIDS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })

        dispatch({
            type: PROPOSAL_BID_RESET,
        })
    }
}

export const rejecttbid = (id) => async (dispatch, getState) => {
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

        const { data } = await axios.patch('/reject_proposalbid/', { "id": id }, config
        )
        dispatch({
            type: USER_REJECT_BID,
        })



    } catch (error) {
        dispatch({
            type: USER_ACCEPT_PROPOSAL_BIDS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })

        dispatch({
            type: PROPOSAL_BID_RESET,
        })
    }
}








export const getUserProfile = () => async (dispatch, getState) => {

    try {

        // dispatch({
        //     type: USER_PROFILE_REQUEST
        // })
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

        // dispatch({
        //     type: OTHER_USER_PROFILE_REQUEST
        // })
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



export const add_review = (project_id, review_desc, rating) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_REVIEW_PROJECT_REQUEST
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

        const { data } = await axios.post('/add_review/', { project_id, review_desc, rating },
            config
        )

        dispatch({
            type: ADD_REVIEW_PROJECT,

        })

        dispatch({
            type: OTHER_USER_PROFILE_SUCCESS,
            payload: data

        })


    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const addProject = (project_title, project_desc, project_image,) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ADD_PROJECT_REQUEST
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

        const { data } = await axios.post('/addproject/',
            { 'user': parseInt(userInfo.id), project_title, project_desc, project_image }, config
        )

        dispatch({
            type: USER_ADD_PROJECT_SUCCESS,
        })

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data

        })


    } catch (error) {
        dispatch({
            type: USER_ADD_PROJECT_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


export const addtoChat = (receiver_id) => async (dispatch, getState) => {
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/chat/add_to_chat/',
            { receiver_id }, config
        )

        dispatch({
            type: ADD_TO_CHAT_LIST_,
        })

}

export const chatmessages = (receiver_id) => async (dispatch, getState) => {
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/chat/chat_messages/', 
            { receiver_id }, config
        )

        dispatch({
            type: GET_CHAT,
            payload:data
        })
}
export const userChatList = () => async (dispatch, getState) => {
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/chat/chat_list/',
             config
        )

        dispatch({
            type: GET_USER_CHAT_LIST_,
            payload:data
        })
}
