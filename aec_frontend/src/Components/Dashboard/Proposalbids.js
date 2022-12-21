import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAllProposalBids } from '../../actions/userActions'



function Proposalbids() {
    const [reload, setReload] = useState()
    const dispatch = useDispatch()

    const proposal = useSelector(state => state.proposalbids)
    const { loading, error, proposalbids } = proposal


    useEffect(() => {
        dispatch(getUserAllProposalBids())
    }, [reload])
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div class="card">
                        <div class="card-header d-md-flex d-block p-0 justify-content-center">
                            <div class="card-tabs mt-3 mt-sm-0 mb-sm-0 mb-3  ">
                                <ul class="nav nav-tabs shadow-none" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#All" role="tab" aria-selected="true">All Proposal Bids</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            proposalbids?.length !== 0 ?
                                <h1 className='mt-5 text-center' >No proposalbids available now!</h1> :
                                <div class="card-body pb-0">
                                    <div class="tab-content">
                                        <div class="tab-pane show active" id="All">
                                            <div class="row align-items-center customer-review-list">
                                                <div class="col-xl-3 col-lg-4 mb-xl-0 mb-3">
                                                    <div class="review-bx">
                                                        <img class="me-3" alt="" />
                                                        <div>
                                                            <span class="text-primary fs-16">#EMP-00025</span>
                                                            <h4 class="mt-1 fs-20 font-w600"><a class="text-black" href="guest-detail.html">Rio Fernandez</a></h4>
                                                            <span class="fs-12">Posted on 26/04/2020, 12:42 AM</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-xxl-6">
                                                    <p class="mb-0">I have been there many times.Rooms ,Food and Service are excellent.we did lots of Excursions and all the places are from the Hotel reachable. we visited Long Waterfall and  was very helpful and excellent</p>
                                                </div>
                                                <div class="col-xl-3 text-end col-xxl-2 action-btn">
                                                    <a class="review-icon rounded-circle btn-success me-3" ><i class="far fa-check-circle"></i></a>
                                                    <a class="review-icon rounded-circle btn-danger" ><i class="far fa-times-circle"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Proposalbids