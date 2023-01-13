import React, { useContext } from 'react'
import Section1 from '../HomePage/Section1'
import Section2 from '../HomePage/Section2'
import Section3 from '../HomePage/Section3'
import Section4 from '../HomePage/Section4'
import Section5 from '../HomePage/Section5'


function Home() {
  
  return (
    <div>
      <Section1/>
      <Section5/>
      <Section4/>
      {/* <Section2/> */}
      <Section3/>
    </div>
  )
}

export default Home