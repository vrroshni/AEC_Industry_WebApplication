import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const Navigate=useNavigate()
  return (
    <div>
      <div class="row justify-content-center h-100 align-items-center mt-5">
        <div class="col-md-7">
          <div class="form-input-content text-center error-page">
            <h1 class="error-text fw-bold">404</h1>
            <h4><i class="fa fa-exclamation-triangle text-warning"></i> The page you were looking for is not found!</h4>
            <p>You may have mistyped the address or the page may have moved.</p>
            <div>
              <a class="btn btn-primary" onClick={()=>Navigate('/')}>Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error