import React from 'react'
import { useNavigate } from 'react-router-dom'

function StatusPending() {
  const navigate = useNavigate()
  return (

    <div className="row justify-content-center h-100 align-items-center">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form bg-warning" >
                <div className="card text-white bg-warning  text-center" style={{  border: "none", borderRadius: "0" }} >
                  <div className="card-body mb-0 pb-3">
                    <span className="me-3">
                      <i className="ms-1 fa fa-redo" style={{ fontSize: "70px" }}></i>
                    </span>
                    <p className="card-text fs-4"> <strong> Your Account Verification is Pending! <br /> Thank you for your patience </strong></p> <br />
                    <a onClick={() => navigate('/profile')} className=" btn bg-white text-warning btn-card">Back to Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default StatusPending