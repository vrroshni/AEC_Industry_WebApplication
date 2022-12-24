import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {add_review} from '../../actions/userActions'



import './star.scss'

function ReviewModal(props) {
    const [star, setStar] = useState(1)
    const [review_desc, setReview_desc] = useState('')
    const dispatch = useDispatch()

    const addReview = (e) => {
        e.preventDefault()
        dispatch(add_review(props.id,review_desc,star)).then(()=>props.handleModalClose())
    }

    return (
        <>
            <div className="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">ADD REVIEW</h5>
                            <button type="button" className="btn-close" onClick={() => props.handleModalClose()}>
                            </button>
                        </div>
                        <form onSubmit={addReview} >
                            <div className="modal-body">
                                <div className="basic-form">

                                    <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Rating</label>
                                        <div className="col-sm-9">
                                            <div className="outer">
                                                <div className="ratings-box">
                                                    <div className="ratings-box__item">
                                                        <label>
                                                            <input id="rate-1"  className="rating-star-button" type="radio" defaultChecked name="rating-star-button" onClick={() => setStar(1)} />
                                                            <div className="star-line-box">
                                                                <span className="rating-star"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                            </div>
                                                        </label>
                                                        <p className='text-dark'>Terrible</p>
                                                    </div>
                                                    <div className="ratings-box__item">
                                                        <label>
                                                            <input id="rate-2" className="rating-star-button" type="radio"  name="rating-star-button" onClick={() => setStar(2)} />
                                                            <div className="star-line-box">
                                                                <span className="rating-star"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                            </div>
                                                        </label>
                                                        <p className='text-dark'>Bad</p>
                                                    </div>
                                                    <div className="ratings-box__item">
                                                        <label>
                                                            <input id="rate-3" className="rating-star-button" type="radio" name="rating-star-button" onClick={() => setStar(3)} />
                                                            <div className="star-line-box">
                                                                <span className="rating-star"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                            </div>
                                                        </label>
                                                        <p className='text-dark'>Okay</p>
                                                    </div>
                                                    <div className="ratings-box__item">
                                                        <label>
                                                            <input id="rate-4" className="rating-star-button" type="radio" name="rating-star-button" onClick={() => setStar(4)} />
                                                            <div className="star-line-box">
                                                                <span className="rating-star"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                            </div>
                                                        </label>
                                                        <p className='text-dark'>Good</p>
                                                    </div>
                                                    <div className="ratings-box__item">
                                                        <label>
                                                            <input id="rate-5" className="rating-star-button" type="radio" name="rating-star-button" onClick={() => setStar(5)} />
                                                            <div className="star-line-box">
                                                                <span className="rating-star"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                                <span className="rating-star-line"></span>
                                                            </div>
                                                        </label>
                                                        <p className='text-dark'>Excellent</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 row">
                                        <label className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea name='description' className="form-control" rows="4" id="comment" required onChange={(e)=>setReview_desc(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    {/* <div className="mb-3 row">
                                        <label className="col-sm-3 col-form-label">Rate</label>
                                        <div className="col-sm-9">

                                            <small className="text-danger">
                                                {errors?.rate && errors.rate.message}
                                            </small>
                                        </div>

                                    </div> */}
                                 </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                                <button type="submit" className="btn btn-primary" >Send Proposal</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewModal