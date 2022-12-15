import React from 'react'

function StatusRejected() {
  return (
    <div className="row justify-content-center h-100 align-items-center">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form bg-danger">
                <div className="card text-white bg-danger text-center" style={{ border: "none", borderRadius: "0" }} >
                  <div className="card-body mb-0 pb-3">
                  <span className="me-3">
                      <i className="flaticon-381-diamond" style={{fontSize:"70px"}}></i>
                    </span>
                    <p className="card-text fs-4">Your Account is rejected due to  lack of some clarifications. <br /> Sorry for your Inconvenience</p> <br />
                    <a className=" btn bg-white text-danger btn-card">Request Again
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