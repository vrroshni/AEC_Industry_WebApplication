import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminProposalList,proposal_accepted,proposal_rejected } from '../../actions/premiumActions'
import DashboardNavbar from './DashboardNavbar'
import Swal from 'sweetalert2'



function PremiumDashboard() {
  const [reload, setReload] = useState()
  const dispatch = useDispatch()

  const allrequests = useSelector(state => state.adminproposals)
  const { proposals } = allrequests

  useEffect(() => {
    dispatch(adminProposalList())
  }, [reload])

  const AcceptHandler=(id)=>{
    Swal.fire({
      title: 'Are you sure you want to accept this Proposal?',
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
          dispatch(proposal_accepted(id))
              .then(() => {
                  setReload(!reload)
              })

      }

  })

  }
  const RejecttHandler=(id)=>{
    Swal.fire({
      title: 'Are you sure you want to reject this Proposal?',
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
          dispatch(proposal_rejected(id))
              .then(() => {
                  setReload(!reload)
              })

      }

  })

  }


  return (
    <>
      <DashboardNavbar />
      {
        proposals?.length !== 0 ?
          <>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Your Proposals from Admin</h4>
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
                            <th><strong>ACCEPT</strong></th>
                            <th><strong>DECLINE</strong></th>
                          </tr>
                        </thead>
                        <tbody id="orders">
                          {proposals?.map((proposal, id) => {
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
                            
                                <td ><button className="btn btn-xs  btn-info">{proposal.status}</button></td>
                                <td ><button className="btn btn-xs  btn-success" onClick={()=>AcceptHandler(proposal.id)}>Accept</button></td>
                                <td ><button className="btn btn-xs  btn-danger" onClick={()=>RejecttHandler(proposal.id)}>Reject</button></td>
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

export default PremiumDashboard