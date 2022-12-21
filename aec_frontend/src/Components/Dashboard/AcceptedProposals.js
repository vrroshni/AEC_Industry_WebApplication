import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminProposalAcceptedList } from '../../actions/premiumActions'
import SendProposalModal from '../Modals/SendProposalModal'
import DashboardNavbar from './DashboardNavbar'


function AcceptedProposals() {
  const [reload, setReload] = useState()
  const [showModal, setShowmodal] = useState(false)
  const [id, setId] = useState()
  const dispatch = useDispatch()

  const allrequests = useSelector(state => state.adminproposalsAccepted)
  const { acceptedproposals } = allrequests

  useEffect(() => {
    dispatch(adminProposalAcceptedList())
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
        acceptedproposals?.length !== 0 ?
          <>
            <div className="row mt-5">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Accepted Proposals </h4>
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
                          {acceptedproposals?.map((proposal, id) => {
                            return (
                              <>
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
                                  <button className="btn btn-xs  btn-info">{proposal.status}</button>
                                </td>
                                <td>
                                  <button className="btn btn-xs  btn-success" onClick={() => handleShow(proposal.id) }>SEND PROPOSAL</button>
                                </td>
                              </tr>
                             
                              </>
                            )
                          })}
                           
                        </tbody>
                      </table>
                     
                    </div>
                  </div>
                  {
                                showModal &&
                                <SendProposalModal
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

export default AcceptedProposals