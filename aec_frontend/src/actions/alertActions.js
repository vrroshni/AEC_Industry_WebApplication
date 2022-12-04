import {
    ALERT_SUCCESS,
    ALERT_FAILURE,
    ALERT_WARNING,
    ALERT_INFO
} from '../constants/alertConstants'
import { toast } from "react-toastify";




export const alertsuccess = () => (dispatch) => {
    dispatch({
        type: ALERT_SUCCESS
    })
    console.log('koooooooooooooo alert')
    toast.success("MY SUCCESS");
}
