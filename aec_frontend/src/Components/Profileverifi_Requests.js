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
  return (
    <>{requests?.length !== 0 ?
      <>
        <div className="row page-titles">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><a href="/">ALL PROFILE VERIFICATION REQUESTS</a></li>
            <li className="breadcrumb-item"><a href="/">Profile verification management</a></li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All Profile Verification Requests</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">PROFILE</th>
                        <th className="align-middle">ROLE</th>
                        <th className="align-middle" style={{ minWidth: "12rem" }}>DETAILS</th>
                        <th className="align-middle ">STATUS</th>
                        <th className="align-middle ">VERIFY</th>
                        <th className="align-middle ">REJECT</th>
                      </tr>
                    </thead>
                    <tbody id="orders">
                      {requests.map((request, id) => {
                        return (
                          <tr className="btn-reveal-trigger" key={id}>
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

                            <td ><span className="badge badge-warning">Pending<span className="ms-1 fas fa-stream"></span></span>
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
        </div> </> :
      <div className="row page-titles text-center">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active"><h1>NO PROFILE VERIFICATION REQUESTS AVAILABLE</h1> </li>
        </ol>
      </div>
    }

    </>
  )
}

export default Profileverifi_Requests