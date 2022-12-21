import axios from 'axios'

import {



    ADMIN_PROPOSALS_LIST,
    ADMIN_PROPOSALS_LIST_FAIL,

    ADMIN_PROPOSALS_ACCEPTED_LIST,
    ADMIN_PROPOSALS_ACCEPTED_LIST_FAIL,

    ADMIN_PROPOSALS_ONPROCESS_LIST,
    ADMIN_PROPOSALS_ONPROCESS_LIST_FAIL,

    ADMIN_PROPOSALS_REJECTED_LIST,
    ADMIN_PROPOSALS_REJECTED_LIST_FAIL,

    ADMIN_PROPOSAL_ACCEPT,
    ADMIN_PROPOSAL_REJECT,

    SEND_PROPOSAL_TO_USER,
    COMPLETED_PROPOSAL_WORK


} from '../constants/premiumConstants'





export const adminProposalList = () => async (dispatch, getState) => {
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

        const { data } = await axios.get('/adminproposals/', config
        )

        dispatch({
            type: ADMIN_PROPOSALS_LIST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PROPOSALS_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })


    }



}
export const adminProposalAcceptedList = () => async (dispatch, getState) => {
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

        const { data } = await axios.get('/adminproposals_accepted/', config
        )

        dispatch({
            type: ADMIN_PROPOSALS_ACCEPTED_LIST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PROPOSALS_ACCEPTED_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })


    }




}
export const adminProposalRejectedList = () => async (dispatch, getState) => {
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

        const { data } = await axios.get('/adminproposals_rejected/', config
        )

        dispatch({
            type: ADMIN_PROPOSALS_REJECTED_LIST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PROPOSALS_REJECTED_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })


    }




}
export const adminProposalOnprocessList = () => async (dispatch, getState) => {
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

        const { data } = await axios.get('/adminproposals_onprocess/', config
        )

        dispatch({
            type: ADMIN_PROPOSALS_ONPROCESS_LIST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PROPOSALS_ONPROCESS_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })


    }
}


export const proposal_accepted = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.patch('/proposal_accepted/', { 'id': id }, config
    )

    dispatch({
        type: ADMIN_PROPOSAL_ACCEPT,
    })

}

export const proposal_rejected = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.patch('/proposal_rejected/', { 'id': id }, config
    )

    dispatch({
        type: ADMIN_PROPOSAL_REJECT,
    })

}
export const send_proposal = (admin_proposal, proposal_content, rate,description) => async (dispatch, getState) => {
    
    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post('/send_proposal/', { 'admin_proposal': admin_proposal, 'proposal_content': proposal_content, 'rate': rate,'description':description }, config
    )

    dispatch({
        type: SEND_PROPOSAL_TO_USER,
    })

}

export const proposal_completed = (id) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.patch('/proposal_completed/', { 'id': id }, config
    )

    dispatch({
        type: ADMIN_PROPOSAL_ACCEPT,
    })

}