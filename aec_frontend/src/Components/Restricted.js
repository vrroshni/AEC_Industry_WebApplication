import React from 'react'
import {useNavigate} from 'react-router-dom'

function Restricted() {
    const Navigate=useNavigate()
  return (
    <div className="vh-100">
        <div className="authincation h-100">
    <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-5">
                <div className="form-input-content text-center error-page">
                    <h1 className="error-text fw-bold">500</h1>
                    <h4><i className="fa fa-times-circle text-danger"></i>Oops!</h4>
                    <p>You do not have permission to view this resource</p> 
                    <div>
                        <a className="btn btn-primary" onClick={()=>Navigate('/')}>Back to Home</a>
                    </div>	
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Restricted