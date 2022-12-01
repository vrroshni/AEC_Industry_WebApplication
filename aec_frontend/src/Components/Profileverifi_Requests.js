import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_profile_verification, profile_rejected, profile_verified } from '../actions/adminActions'


function Profileverifi_Requests() {
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()

  const profileRequestListInfo = useSelector(state => state.allProfRequests)
  const { loading, error, requests, verified, rejected } = profileRequestListInfo

  useEffect(() => {
    dispatch(list_profile_verification())
  }, [reload])
  console.log(requests)
  return (
    <>
      {requests ?
        <>
          <div class="row page-titles">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active"><a href="javascript:void(0)">ALL PROFILE VERIFICATION REQUESTS</a></li>
              <li class="breadcrumb-item"><a href="javascript:void(0)">Profile verification management</a></li>
            </ol>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div className="card-header">
                  <h4 className="card-title">All Profile Verification Requests</h4>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th class="align-middle">#</th>
                          <th class="align-middle">PROFILE</th>
                          <th class="align-middle">ROLE</th>
                          <th class="align-middle" style={{ minWidth: "12rem" }}>DETAILS</th>
                          <th class="align-middle ">STATUS</th>
                          <th class="align-middle ">VERIFY</th>
                          <th class="align-middle ">REJECT</th>
                        </tr>
                      </thead>
                      <tbody id="orders">
                        {requests.map((request, id) => {
                          return (
                            <tr class="btn-reveal-trigger" key={id}>
                              <td >{id + 1}
                              </td>
                              <td >
                                <img className="rounded-circle" style={{
                                  width: "72px",
                                  height: "65px"
                                }} src={request.user.pro_pic} alt="" />
                                <p className='mt-2 ms-3'><strong>{(request.user.full_name).toUpperCase()}</strong></p></td>
                              <td>{request.role} <br />
                              ({request.experience} years Experience)
                              
                              </td>
                              <td >
                                <a href="#">
                                  <strong>#{request.user.id}</strong></a> with <strong>@{request.user.username}</strong><br /><a href={request.user.email}>{request.user.email}</a>
                                  <br />
                                  <strong>ID PROOF :</strong> <a href={request.user.pro_pic} target="_blank" >{request.user.pro_pic}</a>
                                  <br />
                                  <strong>CERTIFICATE :</strong><a href={request.certificate} target="_blank" >{request.certificate}</a>
                                  <br />
                                  <strong>CV :</strong><a href={request.cv} target="_blank" >{request.cv}</a>



                              </td>

                              <td ><span class="badge badge-warning">Pending<span class="ms-1 fas fa-stream"></span></span>
                              </td>
                              <td >
                                <button onClick={() => {
                                  dispatch(profile_verified(request.id))
                                    .then(() => {
                                      setReload(!reload)
                                    })
                                }} className="btn btn-xs btn-success">VERIFY</button>
                              </td>
                              <td >
                                <button onClick={() => {
                                  dispatch(profile_rejected(request.id))
                                    .then(() => {
                                      setReload(!reload)
                                    })
                                }} className="btn btn-xs  btn-danger">REJECT</button>
                              </td>
                            </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div></> :
        <div class="row page-titles text-center">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active"><a href="javascript:void(0)">NO PROFILE VERIFICATION REQUESTS AVAILABLE</a></li>
          </ol>
        </div>
      }

    </>
  )
}

export default Profileverifi_Requests