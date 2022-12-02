import React from 'react'

function Feed() {
    return (
        <div class="row">
            <div class="col-xl-3">
                <div className="row">
                    <div className="col-xl-12">
                        <div class="profile card card-body px-3 pt-3 pb-0">
                            <div class="profile-head">
                                <div class="photo-content">
                                    <div class="cover-photo rounded" style={{ minHeight: "10.625rem" }}></div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-photo">
                                        <img src="innap/images/profile/profile.png" class="img-fluid rounded-circle" alt="" />
                                    </div>
                                    <div class="profile-details">
                                        <div class="profile-name px-3 pt-2">
                                            <h4 class="text-primary mb-0">Mitchell C. Shay</h4>
                                            <p>UX / UI Designer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-statistics">
                                    <div class="text-center">
                                        <div class="row">
                                            <div class="col">
                                                <h3 class="m-b-0">150</h3><span>Follower</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">140</h3><span>Place Stay</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">45</h3><span>Reviews</span>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <a href="javascript:void(0);" class="btn btn-primary mb-1 me-1">Follow</a>
                                            <a href="javascript:void(0);" class="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#sendMessageModal">Send Message</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div className="row">
                    <div className="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-tab">
                                    <div class="custom-tab-1">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item"><a href="#my-posts" data-bs-toggle="tab" class="nav-link active show">Posts</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div id="my-posts" class="tab-pane fade active show">
                                                <div class="my-post-content pt-3">
                                                    <div class="post-input" style={{marginBottom:"0"}}>
                                                        <textarea name="textarea" id="textarea" cols="30" rows="5" class="form-control bg-transparent" placeholder="Please type what you want...."></textarea>
                                                        <a href="javascript:void(0);" class="btn btn-primary light me-1 px-3" data-bs-toggle="modal" data-bs-target="#cameraModal"><i class="fa fa-camera m-0"></i> </a>
                                                        <div class="modal fade" id="cameraModal">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title">Upload images</h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal">
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="input-group mb-3">
                                                                            <span class="input-group-text">Upload</span>
                                                                            <div class="form-file">
                                                                                <input type="file" class="form-file-input form-control" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a href="javascript:void(0);" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postModal">Post</a>
                                                        <div class="modal fade" id="postModal">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title">Post</h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal">
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <textarea name="textarea" id="textarea2" cols="30" rows="5" class="form-control bg-transparent" placeholder="Please type what you want...."></textarea>
                                                                        <a class="btn btn-primary btn-rounded" href="javascript:void(0)">Post</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal fade" id="replyModal">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Post Reply</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <textarea class="form-control" rows="4">Message</textarea>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-danger light" data-bs-dismiss="modal">btn-close</button>
                                                    <button type="button" class="btn btn-primary">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="post-details">
                                    <ul class="mb-2 post-meta " >
                                        <div className="profile-photo d-flex flex-wrap" >
                                            <img src="./innap/images/profile/profile.png" className="img-fluid rounded-circle me-1" style={{ width: "30px" }} alt="" />
                                            <li class="post-author me-3 mt-1 " >By Admin</li>
                                            <li class="post-date me-3 mt-1"><i class="fas fa-calendar-week me-2"></i>18 Nov 2020</li>
                                            <li class="post-comment mt-1"><i class="far fa-comments me-2"></i> 28</li>

                                        </div>

                                    </ul>
                                    <img src="innap/images/profile/8.jpg" alt="" class="img-fluid mb-3 w-100 rounded" />
                                    <h3 class="mb-2 text-black">Collection of textile samples lay spread</h3>

                                    <p>A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.</p>
                                    <div class="comment-respond d-flex flex-column" id="respond">
                                        <div className='d-flex'>
                                            <button class="btn btn-primary me-2"><span class="me-2"><i class="fa fa-heart"></i></span>Like</button>
                                            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#replyModal"><span class="me-2"><i class="fa fa-reply"></i></span>Comment</button>
                                        </div>
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

            <div className="col-xl-3">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="profile-news">
                                <h5 class="text-primary d-inline">Our Latest News</h5>
                                <div class="media pt-3 pb-3">
                                    <img src="innap/images/profile/5.jpg" alt="image" class="me-3 rounded" width="75" />
                                    <div class="media-body">
                                        <h5 class="m-b-5"><a href="post-details.html" class="text-black">Collection of textile samples</a></h5>
                                        <p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div class="media pt-3 pb-3">
                                    <img src="innap/images/profile/6.jpg" alt="image" class="me-3 rounded" width="75" />
                                    <div class="media-body">
                                        <h5 class="m-b-5"><a href="post-details.html" class="text-black">Collection of textile samples</a></h5>
                                        <p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div class="media pt-3 pb-3">
                                    <img src="innap/images/profile/7.jpg" alt="image" class="me-3 rounded" width="75" />
                                    <div class="media-body">
                                        <h5 class="m-b-5"><a href="post-details.html" class="text-black">Collection of textile samples</a></h5>
                                        <p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
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