import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminProposalRejectedList } from '../../actions/premiumActions'
import DashboardNavbar from './DashboardNavbar'


function RejectedProposals() {
    const [reload, setReload] = useState()
    const dispatch = useDispatch()
  
    const allrequests = useSelector(state => state.adminproposalsRejected)
    const {rejectedproposals } = allrequests
  
  
    useEffect(() => {
      dispatch(adminProposalRejectedList())
    }, [reload])



  return (
    <>
      <DashboardNavbar />
      {
        rejectedproposals?.length !== 0 ?
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Rejected Proposals </h4>
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
                          </tr>
                        </thead>
                        <tbody id="orders">
                          {rejectedproposals?.map((proposal, id) => {
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
                                  <button className="btn btn-xs  btn-info">{proposal.proposal.status}</button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
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

export default RejectedProposals