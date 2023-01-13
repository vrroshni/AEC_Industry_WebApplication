import React from 'react'
import { useNavigate } from 'react-router-dom'


function Section1() {
  const Navigate = useNavigate()

  return (
    <div class="row">
      <div class="col-xl-12 col-xxl-12 col-lg-12 text-center pb-4" style={{ backgroundImage: "url(AECFiles/images/20.jpg)", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: " no-repeat", backgroundAttachment: 'scroll' }} >
        <h3 className='mt-5'>We Are Professional</h3>
        <h1 className='mt-2 fw-bolder '>For Your Dream Project</h1>
        <div className='row'>


          <div className="col-3"></div>
          <div className="col-6" style={{ backgroundColor: "rgba(0, 0, 0, .4)"}}>
            <p className='m-4 text-white fs-6'>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their inf
            </p>
          </div>
          <div className="col-3"></div>
        </div>

        <button type="button" className="btn btn-primary mt-4 mb-4" onClick={() => Navigate('/connectUs')} >Connect with Us!</button>
      </div>
    </div>
  )
}

export default Section1