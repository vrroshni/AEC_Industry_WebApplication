import React, { useState,createContext } from 'react'

const AllContext=createContext()
export default AllContext

export const AllProvider=({children})=>{




  let allcontextData={
 hello:'HELLO'
  }
return(
  <AllContext.Provider value={allcontextData}>
     {children}
  </AllContext.Provider>
)
}

