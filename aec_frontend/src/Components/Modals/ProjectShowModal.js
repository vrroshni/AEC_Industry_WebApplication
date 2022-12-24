import React from 'react'

function ProjectShowModal(props) {
    return (
        <>
            <div className="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Project</h5>
                            <button type="button" className="btn-close" onClick={() => props.handleModalClose()}>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <h3> <strong>Image</strong> </h3>
                            {props.image && <div className="input-group mb-3">
                                <img
                                    alt="Preview"
                                    className='w-100 mb-3 rounded'
                                    src={props.image}
                                ></img>

                            </div>}


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectShowModal