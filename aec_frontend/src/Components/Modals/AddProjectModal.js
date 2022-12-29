import React from 'react'
import { addProject } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";

function AddProjectModal(props) {


    const dispatch = useDispatch()
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const registerOptions = {
        project_title: { required: "Project Title is required" },
        project_desc: { required: "Project Description is required" },
        project_image: { required: "Project Image is required" },
    };
    const addproject = (e) => {

        dispatch(addProject(e.project_title, e.project_desc, e.project_image[0]))
        props.handleModalClose()
    }
    return (
        <>
            <div className="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ADD PROJECT</h5>
                            <button type="button" className="btn-close" onClick={() => props.handleModalClose()}>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(addproject)} >
                            <div className="modal-body">
                                <div className="basic-form">

                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Project Title</label>
                                        <div className="col-sm-9">
                                            <input type="text" placeholder="Project Title" className="form-control" name='project_title' {...register('project_title', registerOptions.project_title)} />
                                            <small className="text-danger">
                                                {errors?.project_title && errors.project_title.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea name='project_desc' placeholder="Project Description" className="form-control" rows="4" id="comment" {...register('project_desc', registerOptions.project_desc)} ></textarea>
                                            <small className="text-danger">
                                                {errors?.project_desc && errors.project_desc.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Project Image</label>
                                        <div className="col-sm-9">
                                            <div className="form-file">
                                                <input type="file" name='project_image' className="form-file-input form-control" {...register('project_image', registerOptions.project_image)} />
                                            </div>
                                            <small className="text-danger">
                                                {errors?.project_image && errors.project_image.message}
                                            </small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                                <button type="submit" className="btn btn-primary" >Add Project</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProjectModal