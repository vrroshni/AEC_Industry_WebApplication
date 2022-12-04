
import {
    ALERT_SUCCESS,
    ALERT_FAILURE,
    ALERT_WARNING,
    ALERT_INFO,
    ALERT_RESET
} from '../constants/alertConstants'

export const alertCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ALERT_SUCCESS:
            return { alert: 'success' }

        case ALERT_FAILURE:
            return { alert: 'error' }

        case ALERT_WARNING:
            return { alert: 'warning' }

        case ALERT_INFO:
            return { alert: 'info' }

        case ALERT_RESET:
            return {}

        default:
            return state
    }
}