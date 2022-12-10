import React from 'react'
import { useNavigate } from 'react-router-dom'


function Cancelled() {
    const Navigate=useNavigate()

  return (
    <div class="row justify-content-center h-100 align-items-center">
      <div class="col-md-6">
        <div class="authincation-content">
          <div class="row no-gutters">
            <div class="col-xl-12">
             
                <div class="card text-white bg-danger text-center" style={{ border: "none", borderRadius: "0" }} >
                  <div class="card-body mb-0 pb-3">
                  <span class="me-3">
                      <i class="flaticon-381-diamond" style={{fontSize:"70px"}}></i>
                    </span>
                    <p class="card-text fs-4">Your payment is Cancelled!! <br /> Sorry for your Inconvenience</p> <br />
                    <a onClick={()=>Navigate('/payment')} class=" btn bg-white text-danger btn-card">Request Again for payment
                    </a>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancelled