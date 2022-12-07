import React from 'react'

function Status_Success() {
  return (
    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-md-6">
        <div class="authincation-content">
          <div class="row no-gutters">
            <div class="col-xl-12">
              <div class="auth-form" style={{ background: "#00e934" }}>
                <div class="card text-white  text-center" style={{ background: "#00e934", border: "none", borderRadius: "0" }} >
                  <div class="card-body mb-0 pb-3">
                  <span class="me-3">
                      <i class="far fa-check-circle" style={{fontSize:"70px"}}></i>
                    </span>
                    <p class="card-text fs-4"><strong> Your Account is verified! <br /> Now you are a part of Together</strong></p> <br />
                    <a   class=" btn bg-white text-success btn-card">Premium Membership
                    </a>
                    <p className='mt-2'>(premium membership brings you closer to us)</p>
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

export default Status_Success