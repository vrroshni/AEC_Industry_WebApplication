import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPosts,changeReportStatus } from '../../actions/adminActions'
import Swal from 'sweetalert2'
import Carousel from 'react-bootstrap/Carousel';


function Allposts() {
  const [reload, setReload] = useState(false)
  const dispatch = useDispatch()

  const allPosts = useSelector(state => state.allPosts)
  const { loading, error, allposts } = allPosts


  useEffect(() => {
    dispatch(listPosts())
  }, [reload])


  return (
    <>{allposts?.length !== 0 ?
      <>
        <div className="row page-titles">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><a >ALL POSTS</a></li>
            <li className="breadcrumb-item"><a >Post Management</a></li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All Posts</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "80px" }}><strong>#</strong></th>
                        <th><strong>POST</strong></th>
                        <th><strong>DETAILS</strong></th>
                        <th><strong>ACTION</strong></th>
                      </tr>
                    </thead>
                    <tbody id="orders">
                      {allposts?.map((post, id) => {
                        return (
                          <tr className="btn-reveal-trigger" key={id}>
                            <td >{id + 1}
                            </td>
                            <td >
                              <Carousel style={{
                                      width: "150px",
                                      height: "100px"
                                    }}>
                                {post.post_content_img && <Carousel.Item > 
                                  <img
                                    className="d-block w-100 mb-3 rounded"
                                    src={post.post_content_img}
                                    alt="First slide"
                                  />
                                </Carousel.Item>}
                                {post.post_content_video && <Carousel.Item >
                                  <video
                                    controls
                                    className="d-block w-100 mb-3 rounded"
                                    src={post.post_content_video}
                                    alt="Second slide"
                                  />
                                </Carousel.Item>}
                              </Carousel>
                              {post.post_desc && <h5 > Caption : {post.post_desc}</h5>}
                              <p className='mt-2'><strong>Posted By:{post.user.full_name}</strong></p>
                            </td>
                            <td>
                              <a href="#">
                                <strong className="text-primary">#{post.id}</strong>
                                </a> <br /> 
                                likes: {post.likes}  <br /> dislikes: {post.dislikes} <br /> comments: {post.comments}<br />
                              <a href="#">
                                No.of Reports:<strong className="text-primary">{post.no_of_reports}</strong>
                                </a><br />
                              <strong>
                                posted at:{post.posted_at}</strong><br />
                            </td>

                            <td >
                              {post.reported_status === true ?
                                <span onClick={() => Swal.fire({
                                  title: 'Are you sure you want to do this Action?',
                                  showConfirmButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: "OK",
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  cancelButtonText: "Cancel",
                                  icon: 'warning'
                                }
                                ).then((result) => {
                                  if (result.isConfirmed) {
                                    dispatch(changeReportStatus(post.id))
                                      .then(() => {
                                        dispatch(listPosts())
                                      })

                                  }

                                })
                                } className="btn btn-xs  btn-danger"> Undo Report</span> :
                                <span onClick={() => Swal.fire({
                                  title: 'Are you sure you want to do this Action?',
                                  showConfirmButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: "OK",
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  cancelButtonText: "Cancel",
                                  icon: 'warning'
                                }
                                ).then((result) => {
                                  if (result.isConfirmed) {
                                    dispatch(changeReportStatus(post.id))
                                      .then(() => {
                                        dispatch(listPosts())
                                      })

                                  }

                                })
                                } className="btn btn-xs  btn-success">Report it</span>
                              }
                            </td>
                          </tr>)
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> </> :
      <div className="row page-titles text-center mt-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active"><h1>NO POSTS AVAILABLE</h1> </li>
        </ol>
      </div>
    }

    </>
  )
}

export default Allposts