import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';
import ProjectShowModal from '../Modals/ProjectShowModal'
import ReviewModal from '../Modals/ReviewModal'

function UserProjects({ project }) {
  const [designshowModal, setDesignshowModal] = useState(false)
  const [reviewshowModal, setreviewshowModal] = useState(false)
  const [design, setdesign] = useState(false)
  const [id, setId] = useState()


  const dispatch = useDispatch()

  const getUserProfileInfo = useSelector(state => state.getUserProfile)
  const { fullUserProfileInfo } = getUserProfileInfo
  const ReviewhandleShow = (id) => {
    setId(id)
    setreviewshowModal(true)
  }
  const DesignhandleShow = () => {
    setDesignshowModal(true)
  }

  const DesignhandleOnhide = () => {

    setDesignshowModal(false)
  }
  const ReviewhandleOnhide = () => {

    setreviewshowModal(false)
  }



  return (
    <>
      <div className="row align-items-center customer-review-list">
        <div className="col-xl-3 col-lg-4 mb-xl-0 mb-3">
          <div className="review-bx">
            <img className="me-3" src={project.project_image} alt="" />
            <div>
              <span className="text-primary fs-16">#PROJECT-000{project.id}</span>
              <h4 className="mt-1 fs-20 font-w600"><a className="text-black" >{project.project_title}</a></h4>
              <span className="fs-12">Posted on {project.posted_on.substring(0, 10)}  </span>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6">
          <p className="mb-0">{project.project_desc}</p>
          {project.review !== null && <>
            <hr />
            <ul className="star-review mb-2">
              <li><i className="fas fa-star orange"></i></li>
              <li><i className="fas fa-star orange"></i></li>
              <li><i className="fas fa-star orange"></i></li>
              <li><i className="fas fa-star orange"></i></li>
              <li><i className="fas fa-star"></i></li>
            </ul>
            <p className="mb-0">{project?.review?.review_desc}</p>
            <h4>{project?.project_client?.full_name}</h4>
          </>
          }
        </div>
        <div className="col-xl-3 text-end col-xxl-2 action-btn">
          <a className="review-icon rounded-circle btn-dark me-3" onClick={() => {
            setdesign(project.project_image)
            DesignhandleShow()
          }}><AiFillEye /></a>
          {((project?.project_client?.id === fullUserProfileInfo.id)) && <a className="review-icon rounded-circle btn-info me-3" onClick={() =>ReviewhandleShow(project.id) } ><MdOutlineRateReview /></a>}
          {/* <a className="review-icon rounded-circle btn-info me-3" onClick={() =>ReviewhandleShow(project.id) } ><MdOutlineRateReview /></a> */}
        </div>
      </div>
      {
        designshowModal &&
        <ProjectShowModal
          image={design}
          showModal={designshowModal}
          handleModalClose={() => DesignhandleOnhide()}
        />
      }
      {
        reviewshowModal &&
        <ReviewModal
          id={id}
          showModal={reviewshowModal}
          handleModalClose={() => ReviewhandleOnhide()}
        />
      }

    </>
  )
}

export default UserProjects