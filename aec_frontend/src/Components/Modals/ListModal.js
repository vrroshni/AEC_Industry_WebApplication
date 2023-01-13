import React from 'react'

function ListModal(props) {
    return (

        <div className="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" className="btn-close" onClick={() => props.handleModalClose()}>
                        </button>
                    </div>
                    <div className="modal-body text-center">
                        <div>
                            <div id="DZ_W_Todo1" class="widget-media dz-scroll height370 ps ps--active-y ">
                                <ul class="timeline text-center">
                                    {props.network?.length !== 0 ?
                                        
                                        props.network?.map(user => {
                                                return (
                                                    <li>
                                                        <div class="timeline-panel">
                                                            <div class="media me-2">
                                                                <img alt="image" width="50" src={user?.pro_pic}/>
                                                            </div>
                                                            <div class="media-body">
                                                                <h5 class="mb-1">Dr sultads Send you Photo</h5>
                                                                <small class="d-block">29 July 2020 - 02:26 PM</small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                            )
                                         : <li>
                                            <div class="timeline-panel">
                                                <h1>No {props.title} yet!!</h1>
                                            </div>
                                        </li>}


                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ListModal