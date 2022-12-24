import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Section1 from '../HomePage/Section1'


function Home() {
const Navigate=useNavigate()
  
  return (
    <div>
      <Section1/>
      <h1>Welcome to Together!</h1>
      <button type="button" className="btn btn-outline-primary" onClick={()=>Navigate('/connectUs')} >Connect with Us!</button>
    </div>
  )
}

export default Home