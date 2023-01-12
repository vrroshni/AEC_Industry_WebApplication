// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Footer from '../Footer'
// import Navbar from '../Navbar'
// import useWindowSize from '../../CustomHooks/useWindowSize'

// function common() {

//   const [width, height] = useWindowSize()
// 	console.log(width, height, 'diiiiiiiiiiiii')

//   return (
//     <div id="main-wrapper" className="show menu-toggle">
//       <Navbar />
//       <div className="content-body">
//         <div className="container-fluid">
//           <Outlet />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default common
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import useWindowSize from '../../CustomHooks/useWindowSize'


const Common = () => {
    const [width, height] = useWindowSize()
	console.log(width, height, 'diiiiiiiiiiiii')

  return (
    <div id="main-wrapper" className={width<= 768 ? 'show' : 'show menu-toggle'}>
      <Navbar />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
     </div>
)
}

export default Common