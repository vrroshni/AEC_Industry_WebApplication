import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAllProposalBids, acceptbid, rejecttbid } from '../../actions/userActions'
import PaymentModal from '../Modals/PaymentModal'
import QueryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'






function Proposalbids() {

    const [reload, setReload] = useState()
    const [showModal, setShowmodal] = useState(false)
    const [design, setdesign] = useState(false)
    const [id, setId] = useState()
    const [rate, setRate] = useState()

    const dispatch = useDispatch()
    const location = useLocation()
    const Navigate = useNavigate()
    const proposalbids = useSelector(state => state.proposalbids)
    const { loading, error, proposals } = proposalbids

    useEffect(() => {
        const values = QueryString.parse(location.search)
        console.log(values, 'ggggggggggg')
        if (values.success) {

            dispatch(acceptbid(values.id))
            Navigate('/requests')
        }
        if (values.canceled) {
            setShowmodal(false)
            Navigate("/proposalbids")
        }
        dispatch(getUserAllProposalBids())
    }, [reload])

    const handleShow = (id, rate) => {
        setId(id)
        setRate(rate)
        setShowmodal(true)
    }

    const handleOnhide = () => {

        setShowmodal(false)
    }
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card">
                        <div className="card-header d-md-flex d-block p-0 justify-content-center">
                            <div className="card-tabs mt-3 mt-sm-0 mb-sm-0 mb-3  ">
                                <ul className="nav nav-tabs shadow-none" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-bs-toggle="tab" href="#All" role="tab" aria-selected="true">All Proposal Bids</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            proposals?.length === 0 ?
                                <h1 className='mt-5 text-center' >No proposalbids available now!</h1> :
                                <div className="card-body pb-0">
                                    <div className="tab-content">
                                        <div className="tab-pane show active" id="All">
                                            {
                                                proposals?.map((proposal, id) => {
                                                    return (

                                                        <div className="row align-items-center customer-review-list" key={id}>
                                                            <div className="col-xl-3 col-lg-4 mb-xl-0 mb-3">
                                                                <div className="review-bx">
                                                                    <img className="me-3" src={proposal.proposal_content} alt="" />
                                                                    <div>
                                                                        <span className="text-primary fs-16">#PRP-00{proposal.id}</span>
                                                                        <h4 className="mt-1 fs-20 font-w600"><a className="text-black" href="guest-detail.html">{proposal.admin_proposal.eligible.full_name}</a></h4>
                                                                        <span className="fs-12">Posted on {proposal.send_at.substring(0, 10)}</span> <br />
                                                                        <span className="fs-16 text-primary">Rate : ₹{proposal.rate}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-xxl-6">
                                                                <p className="mb-0">{proposal.description}</p>

                                                            </div>
                                                            <div className="col-xl-3 text-end col-xxl-2 action-btn">
                                                                <a className="review-icon rounded-circle btn-success me-3" onClick={() => {
                                                                    setdesign(proposal.proposal_content)

                                                                    handleShow(proposal.id, proposal.rate)
                                                                }}><i className="far fa-check-circle"></i></a>
                                                                <a className="review-icon rounded-circle btn-danger" onClick={() => Swal.fire({
                                                                    title: 'Are you sure you want to do this Action?',
                                                                    showConfirmButton: true,
                                                                    showCancelButton: true,
                                                                    confirmButtonText: "OK",
                                                                    confirmButtonColor: '#3085d6',
                                                                    cancelButtonColor: '#d33',
                                                                    cancelButtonText: "Cancel",
                                                                    icon: 'warning'
                                                                }
                                                                ).then((result) => {
                                                                    if (result.isConfirmed) {
                                                                        dispatch(rejecttbid(proposal.id))
                                                                            .then(() => {
                                                                                setReload(!reload)
                                                                            })

                                                                    }

                                                                })
                                                                }
                                                                ><i className="far fa-times-circle"></i></a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            {
                                                showModal &&
                                                <PaymentModal
                                                    image={design}
                                                    id={id}
                                                    rate={rate}
                                                    showModal={showModal}
                                                    handleModalClose={() => handleOnhide()}
                                                />
                                            }
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