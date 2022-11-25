import React from 'react'
import '../componentsCSS/feed.css'
import Navbar from './Navbar'

function Feed() {

    return (
        <div className='container-fluid' >
            <div className="row pt-3" >
                <div className="col-xl-4  firstbox" style={{ maxHeight: "28rem" }} >
                    <div className="profile card card-body px-3 pt-4 pb-0">
                        <div className="profile-head">
                            <div className="photo-content">
                                <div className="cover-photo rounded" ></div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-photo">
                                    <img src="./innap/images/profile/profile.png" className="img-fluid rounded-circle" alt="" />
                                </div>
                                <div className="profile-details">
                                    <div className="profile-name  pt-2">
                                        <h4 className="text-primary mb-0">Mitchell C. Shay</h4>
                                        <p>UX / UI Designer</p>
                                    </div>
                                    <div className="profile-email px-2 pt-2">
                                        <h4 className="text-muted mb-0">hello@email.com</h4>
                                        <p>Email</p>
                                    </div>
                                    {/* <div className="dropdown ms-auto">
											<a href="#" className="btn btn-primary light sharp" data-bs-toggle="dropdown" aria-expanded="true"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></a>
											<ul className="dropdown-menu dropdown-menu-end">
												<li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> View profile</li>
												<li className="dropdown-item"><i className="fa fa-users text-primary me-2"></i> Add to btn-close friends</li>
												<li className="dropdown-item"><i className="fa fa-plus text-primary me-2"></i> Add to group</li>
												<li className="dropdown-item"><i className="fa fa-ban text-primary me-2"></i> Block</li>
											</ul>
										</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5  secondbox">
                    <div className="card">
                        <div className="card-body">
                            <div className="post-details">
                                <ul className="mb-4 post-meta d-flex flex-wrap" style={{ maxHeight: "10px" }}>
                                    <div className="profile-photo" >
                                        <img src="./innap/images/profile/profile.png" className="img-fluid rounded-circle" style={{ width: "30px" }} alt="" />
                                    </div>

                                    <li className="post-author me-3 ms-2 mt-1">By Admin</li>
                                    <li className="post-date me-3 mt-1"><i className="fas fa-calendar-week me-2"></i>18 Nov 2020</li>
                                    <li className="post-comment mt-1"><i className="far fa-comments me-2"></i> 28</li>
                                </ul>

                                <img src="./innap/images/profile/8.jpg" alt="" className="img-fluid mb-3 w-100 rounded" />
                                <h3 className="mb-2 text-black">Collection of textile samples lay spread</h3>
                                <p>A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.</p>
                                {/* <p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p> */}
                                {/* <blockquote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.</blockquote>
                                <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p> */}
                                {/* <div className="profile-skills mt-5 mb-5">
										<h4 className="text-primary mb-2">Skills</h4>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Admin</a>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Dashboard</a>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Photoshop</a>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Bootstrap</a>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Responsive</a>
										<a href="/" className="btn btn-primary light btn-xs mb-1">Crypto</a>
									</div> */}
                                {/* <div className="comment-respond" id="respond">
										<h4 className="comment-reply-title text-primary mb-3" id="reply-title">Leave a Reply </h4>
										<form className="comment-form" id="commentform" method="post">
											<div className="row"> 
												<div className="col-lg-6">
													<div className="mb-3">
														<label htmlFor="author" className="text-black font-w600 form-label">Name <span className="required">*</span></label>
														<input type="text" className="form-control" value="Author" name="Author" placeholder="Author" id="author"/>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="mb-3">
														<label htmlFor="email" className="text-black font-w600 form-label">Email <span className="required">*</span></label>
														<input type="text" className="form-control" value="Email" placeholder="Email" name="Email" id="email"/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="mb-3">
														<label htmlFor="comment" className="text-black font-w600 form-label">Comment</label>
														<textarea rows="8" className="form-control" name="comment" placeholder="Comment" id="comment"></textarea>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="mb-3">
														<input type="submit" value="Post Comment" className="submit btn btn-primary" id="submit" name="submit"/>
													</div>
												</div>
											</div>
										</form>
									</div> */}
                                <button className="btn btn-primary me-2"><span className="me-2"><i
                                    className="fa fa-heart"></i></span>Like</button>
                                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#replyModal"><span className="me-2"><i
                                    className="fa fa-reply"></i></span>Reply</button>

                                <div className="accordion accordion-start-indicator mt-4" id="accordion-five">
                                    <div className="accordion-item">
                                        <div className="accordion-header rounded-lg collapsed" id="accord-5One" data-bs-toggle="collapse" data-bs-target="#collapse5One" aria-controls="collapse5One" aria-expanded="false" role="button">
                                            <span className='text-black' >Show Comments<i className="far fa-comments ms-2"></i></span>
                                            <span className="accordion-header-indicator"></span>
                                        </div>
                                        <div id="collapse5One" className="accordion__body collapse" aria-labelledby="accord-5One" data-bs-parent="#accordion-five" >
                                            <div className="accordion-body-text">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                            </div>
                                        </div>
                                    </div>
                                   
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="replyModal">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Post Reply</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <textarea className="form-control" rows="4">Message</textarea>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">btn-close</button>
                                <button type="button" className="btn btn-primary">Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3  thirdbox" style={{ maxHeight: "28rem" }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-news">
                                <h5 className="text-primary d-inline">Our Latest News</h5>
                                <div className="media pt-3 pb-3">
                                    <img src="./innap/images/profile/5.jpg" alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                        <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3">
                                    <img src="./innap/images/profile/6.jpg" alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                        <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3">
                                    <img src="./innap/images/profile/7.jpg" alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                        <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Feed