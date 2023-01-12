import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, render, cancel, register } from 'timeago.js';
import {reject_connection,accept_connection} from '../../actions/userActions'

const Notification = () => {

    const dispatch = useDispatch()
    const Notifications = useSelector(state => state.notification)
    const { notifications } = Notifications




    return (

        <div className="row">
            <div className="col-xl-8 col-xxl-8 col-lg-8 mt-2"></div>
            <div className="col-xl-3 col-xxl-3 col-lg-3 mt-2" >
                {notifications?.length !== 0 ?

                    <div className="card">
                        <div className="card-header  border-0 pb-0">
                            <h4 className="card-title">All Notifications</h4>
                        </div>
                        <div className="card-body">
                            <div id="DZ_W_Notification1" class="widget-media dz-scroll p-3">
                                <ul class="timeline">
                                    {notifications?.map(notification => {
                                        return (

                                            notification?.notification_of === "connection_request" ?
                                                <li>
                                                    <div class="timeline-panel">
                                                        <div class="media me-2">
                                                            <img alt="image" width="50" src={notification?.message_sender?.pro_pic} />
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="mb-1">kkoiiii{notification?.notification_text}</h6>
                                                            <small class="d-block">{format(notification.timestamp)}</small>
                                                            <a onClick={dispatch(accept_connection(notification?.network_notification?.id))} class="btn btn-success btn-xxs shadow mt-1">Accept</a>
                                                            <a onClick={dispatch(reject_connection(notification?.network_notification?.id))} class="btn btn-outline-danger btn-xxs shadow mt-1 ms-1">Reject</a>

                                                        </div>
                                                    </div>
                                                </li> : <li>
                                                    <div class="timeline-panel">
                                                        <div class="media me-2">
                                                            <img alt="image" width="50" src={notification?.message_sender?.pro_pic} />
                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="mb-1">{notification?.notification_text}</h6>
                                                            <small class="d-block">{format(notification.timestamp)}</small>
                                                        </div>
                                                    </div>
                                                </li>

                                        )
                                    }
                                    )
                                    }


                                </ul>
                            </div>
                            <a class="all-notification" href="javascript:void(0);">See all notifications <i class="ti-arrow-end"></i></a>
                        </div>
                    </div> :
                    <div className="card">
                        <div className="card-header mb-4 border-0 pb-0">
                            <h4 className="card-title">No Notifications Yet!</h4>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Notification