import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserAllConnectUsRequest } from '../../actions/userActions'
import DashboardNavbar from './DashboardNavbar'



function ClientDashboard() {
  const [reload, setReload] = useState()
  const dispatch = useDispatch()
  const Navigate=useNavigate()



  const allrequests = useSelector(state => state.allConnectrequest)
  const { loading, error, requests } = allrequests

  useEffect(() => {
    dispatch(getUserAllConnectUsRequest())
  }, [reload])


  return (
    <>
      {requests?.length !== 0 ?
        <>
        <button className='btn btn-xs mt-2  btn-primary' onClick={()=>Navigate('/proposalbids')}>Proposal Bids</button>
          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Your Requests</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "80px" }}><strong>#</strong></th>
                          <th><strong>REQUEST</strong></th>
                          <th><strong>REQUIREMENT</strong></th>
                          <th><strong>DETAILS</strong></th>
                          <th><strong>STATUS</strong></th>
                        </tr>
                      </thead>
                      <tbody id="orders">
                        {requests?.map((request, id) => {
                          return (
                            <tr className="btn-reveal-trigger" key={id}>
                              <td >{id + 1}
                              </td>
                              <td><a href="#">
                                ID: <strong className="text-primary">#{request.id}</strong> <br /></a> from <strong>
                                  {request.request_from.username}</strong><br /><a href={request.request_from.email}>{request.request_from.email}</a>
                              </td>
                              <td>{request.role}</td>
                              <td >

                                location: {request.location}  <br /> Experience: {request.experience} <br /> Details: {request.requirementdetails}<br />

                                <strong>
                                  requested  at:{request.created_at.substring(0, 10)}</strong><br />

                              </td>
                              <td>
                                <button className="btn btn-xs  btn-info">{request.status}</button> <br />
                                {request.is_acceptedbyUser &&<button className="btn btn-xs mt-2  btn-primary">Message</button>}
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
          No requests
        </h1>
      }

    </>
  )
}

export default ClientDashboard