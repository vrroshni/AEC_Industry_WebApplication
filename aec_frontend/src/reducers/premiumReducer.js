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
    COMPLETED_PROPOSAL_WORK,
    PROPOSAL_INTERACTION_RESET

} from '../constants/premiumConstants'




export const adminProposalReducer = (state = { proposals: [] }, action) => {
    switch (action.type) {

        case ADMIN_PROPOSALS_LIST:
            return { proposals: action.payload }

        case ADMIN_PROPOSALS_LIST_FAIL:
            return { error: action.payload }

        default:
            return state
    }
}


export const adminProposalAcceptedReducer = (state = { acceptedproposals: [] }, action) => {
    switch (action.type) {

        case ADMIN_PROPOSALS_ACCEPTED_LIST:
            return { acceptedproposals: action.payload }

            case ADMIN_PROPOSALS_ACCEPTED_LIST_FAIL:
                return { error: action.payload }

        default:
            return state
    }
}


export const adminProposalRejectedReducer = (state = { rejectedproposals: [] }, action) => {
    switch (action.type) {

        case ADMIN_PROPOSALS_REJECTED_LIST:
            return { rejectedproposals: action.payload }

            case ADMIN_PROPOSALS_REJECTED_LIST_FAIL:
                return { error: action.payload }

        default:
            return state
    }
}


export const adminProposalOnprocessReducer = (state = { onprocessproposals: [] }, action) => {
    switch (action.type) {

        case ADMIN_PROPOSALS_ONPROCESS_LIST:
            return { onprocessproposals: action.payload }

            case ADMIN_PROPOSALS_ONPROCESS_LIST_FAIL:
                return { error: action.payload }

        default:
            return state
    }
}


export const proposalActionsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_PROPOSAL_ACCEPT:
            return {
                accepted: true
            }

        case ADMIN_PROPOSAL_REJECT:
            return {
                rejected: true
            }

        case SEND_PROPOSAL_TO_USER:
            return {
                send: true
            }

        case COMPLETED_PROPOSAL_WORK:
            return {
                completed: true
            }

        case PROPOSAL_INTERACTION_RESET:
            return {}

        default:
            return state
    }
}
