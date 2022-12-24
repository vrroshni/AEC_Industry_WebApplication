import React from 'react'
import { publish_proposal_completed, adminProposalOnprocessList } from '../../actions/premiumActions'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";

function PublishModal(props) {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const registerOptions = {
        title: { required: "Title is required" },
        image_work: { required: "Image is required" },
        rate: { required: "Rate is required" },
        description: {
            required: "Description is required",
            pattern: {
                value: /^[a-zA-Z!”$%&'()*\+,\/;\[\\\]\^_`{|}~.0-9\ ]+$/,
                message: "Enter valid description about yourself",
            },
        },


    };

    const complete_publish_ = (e) => {
        dispatch(publish_proposal_completed(
            props.id,
            e.title,
            e.image_work[0],
            e.description
        )).then(() => {
            props.handleModalClose()
            dispatch(adminProposalOnprocessList())
        })



    }

    return (
        <>
            <div className="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Publish Work</h5>
                            <button type="button" className="btn-close" onClick={() => props.handleModalClose()}>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(complete_publish_)}>
                            <div className="modal-body">
                                <div className="basic-form">
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Project Title</label>
                                        <div className="col-sm-9">
                                            <input type="text" name="title" className="form-control" placeholder="Enter the title" {...register('title', registerOptions.title)} />
                                            <small className="text-danger">
                                                {errors?.title && errors.title.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Image</label>
                                        <div className="col-sm-9">
                                            <div className="form-file">
                                                <input type="file" name='image_work' className="form-file-input form-control" {...register('image_work', registerOptions.image_work)} />
                                            </div>
                                            <small className="text-danger">
                                                {errors?.image_work && errors.image_work.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea name='description' className="form-control" rows="4" id="comment" {...register('description', registerOptions.description)}></textarea>
                                            <small className="text-danger">
                                                {errors?.description && errors.description.message}
                                            </small>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                                <button type="submit" className="btn btn-primary" >Publish</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PublishModal