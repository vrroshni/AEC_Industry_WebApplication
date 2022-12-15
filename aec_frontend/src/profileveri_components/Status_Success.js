import React from 'react'
import { useNavigate } from 'react-router-dom'

function Status_Success() {
  const Navigate=useNavigate()
  return (
    <div className="row justify-content-center h-100 align-items-center">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form bg-success" >
                <div className="card text-white bg-success  text-center" style={{  border: "none", borderRadius: "0" }} >
                  <div className="card-body mb-0 pb-3">
                  <span className="me-3">
                      <i className="far fa-check-circle" style={{fontSize:"70px"}}></i>
                    </span>
                    <p className="card-text fs-4"><strong> Your Account is verified! <br /> Now you are a part of Together</strong></p> <br />
                    <a onClick={()=>Navigate('/payment')}   className=" btn bg-white text-success btn-card">Premium Membership
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