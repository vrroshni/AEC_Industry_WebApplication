import React from 'react'

function StatusRejected() {
  return (
    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-md-6">
        <div class="authincation-content">
          <div class="row no-gutters">
            <div class="col-xl-12">
              <div class="auth-form bg-danger">
                <div class="card text-white bg-danger text-center" style={{ border: "none", borderRadius: "0" }} >
                  <div class="card-body mb-0 pb-3">
                  <span class="me-3">
                      <i class="flaticon-381-diamond" style={{fontSize:"70px"}}></i>
                    </span>
                    <p class="card-text fs-4">Your Account is rejected due to  lack of some clarifications. <br /> Sorry for your Inconvenience</p> <br />
                    <a class=" btn bg-white text-danger btn-card">Request Again
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

export default StatusRejected