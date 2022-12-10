import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const Navigate=useNavigate()
  return (
    <div>
      <div className="row justify-content-center h-100 align-items-center mt-5">
        <div className="col-md-7">
          <div className="form-input-content text-center error-page">
            <h1 className="error-text fw-bold">404</h1>
            <h4><i className="fa fa-exclamation-triangle text-warning"></i> The page you were looking for is not found!</h4>
            <p>You may have mistyped the address or the page may have moved.</p>
            <div>
              <a className="btn btn-primary" onClick={()=>Navigate('/')}>Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error