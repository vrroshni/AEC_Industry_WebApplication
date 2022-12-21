import React from 'react'
import { useNavigate,Link } from 'react-router-dom'


function DashboardNavbar() {
  return (
    <div className='d-flex justify-content-start'>
      <Link to="/proposals" className="btn btn-xs  btn-primary">Proposals from Admin</Link>       
      <Link to="/acceptedproposals" className="btn btn-xs  btn-primary ms-4">Accepted Proposals</Link>        
      <Link to="/onprocess" className="btn btn-xs  btn-primary   ms-4">OnGoing Works</Link>        
      <Link to="/rejectedproposals"  className="btn btn-xs  btn-danger ms-4">Rejected Proposals</Link>        
    </div>
  )
}

export default DashboardNavbar