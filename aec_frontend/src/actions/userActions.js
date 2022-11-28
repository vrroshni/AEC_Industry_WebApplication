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

    // USER_PROFILEVERIFIED_SUCCESS,
    // USER_PROFILEVERIFIED_FAIL,
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




export const profileverification = (user,location,experience,cerificate,cv,id_proof) => async (dispatch) => {
    try {

        dispatch({
            type: USER_PROFILEVERIFY_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('profileverification/',
            { 'user': user, 'location': location,'experience':experience,'cerificate':cerificate,'cv':cv,'id_proof':id_proof }, config
        )

        dispatch({
            type: USER_PROFILEVERIFY_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_PROFILEVERIFY_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}



/* ---------------------------------- admin --------------------------------- */
// export const profileverified = (id) =>async (dispatch) => {

//     try {

//         const config = {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         }
        
//         const { data } = await axios.patch('profileverification/',
//             { 'user_id': id}, config
//         )
        
//         dispatch({
//             type: USER_PROFILEVERIFIED_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_PROFILEVERIFIED_FAIL,
//             payload: error.response && error.response.data.detail ?
//                 error.response.data.detail : error.message,
//         })
//     }
    
// }


