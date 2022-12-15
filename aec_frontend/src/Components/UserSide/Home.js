import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {
const Navigate=useNavigate()
  
  return (
    <div>
      <h1>Welcome to Together!</h1>
      <button type="button" className="btn btn-outline-primary" onClick={()=>Navigate('/connectUs')} >Connect with Us!</button>
    </div>
  )
}

export default Home