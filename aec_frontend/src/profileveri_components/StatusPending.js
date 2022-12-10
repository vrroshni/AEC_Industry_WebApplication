import React from 'react'
import { useNavigate } from 'react-router-dom'

function StatusPending() {
  const navigate = useNavigate()
  return (

    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-md-6">
        <div class="authincation-content">
          <div class="row no-gutters">
            <div class="col-xl-12">
              <div class="auth-form bg-warning" >
                <div class="card text-white bg-warning  text-center" style={{  border: "none", borderRadius: "0" }} >
                  <div class="card-body mb-0 pb-3">
                    <span class="me-3">
                      <i class="ms-1 fa fa-redo" style={{ fontSize: "70px" }}></i>
                    </span>
                    <p class="card-text fs-4"> <strong> Your Account Verification is Pending! <br /> Thank you for your patience </strong></p> <br />
                    <a onClick={() => navigate('/profile')} class=" btn bg-white text-warning btn-card">Back to Profile
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