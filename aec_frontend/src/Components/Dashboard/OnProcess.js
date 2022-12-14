import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminProposalOnprocessList, proposal_completed,publish_proposal_completed } from '../../actions/premiumActions'
import PublishModal from '../Modals/PublishModal'
import DashboardNavbar from './DashboardNavbar'
import Swal from 'sweetalert2'

function OnProcess() {
  const [reload, setReload] = useState()
  const [showModal, setShowmodal] = useState(false)
  const [id, setId] = useState()
  const dispatch = useDispatch()

  const allrequests = useSelector(state => state.adminproposalsOnprocess)
  const { onprocessproposals } = allrequests


  useEffect(() => {
    dispatch(adminProposalOnprocessList())
  }, [reload])

  const handleShow = (id) => {
    setId(id)
    setShowmodal(true)
  }

  const handleOnhide = () => {
    setShowmodal(false)
  }

  return (
    <>
      <DashboardNavbar />
      {
        onprocessproposals?.length !== 0 ?
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Your Ongoing Proposals</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: "80px" }}><strong>#</strong></th>
                            <th><strong>PROPOSAL</strong></th>
                            <th><strong>DETAILS</strong></th>
                            <th><strong>STATUS</strong></th>
                            <th><strong>ACTION</strong></th>
                          </tr>
                        </thead>
                        <tbody id="orders">
                          {onprocessproposals?.map((proposal, id) => {
                            return (
                              <tr className="btn-reveal-trigger" key={id}>
                                <td >{id + 1}
                                </td>
                                <td>
                                  <a href="#">
                                    ID: <strong className="text-primary">#{proposal.id}</strong> <br />
                                  </a> from
                                  <strong> {proposal.proposal_from.username}</strong><br />
                                  <a href={proposal.proposal_from.email}>{proposal.proposal_from.email}</a>
                                </td>
                                <td >
                                  Details: {proposal.proposal.requirementdetails}  <br />
                                  Related: {proposal.proposal.related} <br />
                                  Location: {proposal.proposal.location}<br />
                                  requested  at: <strong>{proposal.proposal.created_at.substring(0, 10)}</strong><br />
                                </td>
                                <td>
                                  <button className="btn btn-xs  btn-info">{proposal.status}</button> <br />
                                </td>
                                <td>
                                  <button className="btn btn-xs   btn-primary" onClick={() => {
                                    Swal.fire({
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
                                        dispatch(proposal_completed(proposal.id))
                                              .then(() => {
                                                  setReload(!reload)
                                              })

                                      }

                                  })
                                    
                                    }}>Completed</button>
                                  <button className="btn btn-xs ms-2 btn-primary" onClick={() => handleShow(proposal.id) }>Publish</button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {
                                showModal &&
                                <PublishModal
                                  id={id}
                                  showModal={showModal}
                                  handleModalClose={() => handleOnhide()}
                                />
                              }
                </div>
              </div>
            </div>
          </>
          : <h1 className='mt-5 text-center'>
            No Proposals yet!
          </h1>
      }


    </>
  )
}

export default OnProcess