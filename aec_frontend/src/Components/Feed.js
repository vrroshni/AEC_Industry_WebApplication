import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { GoCommentDiscussion } from 'react-icons/go';
import { SlLike, SlDislike } from 'react-icons/sl';
import { addPost, allFeed, post_like, post_dislike } from '../actions/userActions'
import { USER_ADD_POST_RESET } from '../constants/userConstants'
import '../componentsCSS/feed.css'
import dayjs from "dayjs";
import Accordion from 'react-bootstrap/Accordion';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





function Feed() {
    const [show, setShow] = useState(false);

    const [reload, setReload] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [post_desc, setPost_desc] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fronterror, setfronterror] = useState(null)

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const registerOptions = {
        comment: { required: "Comment is required" }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const ImagehandleChange = (e) => {
        setfronterror('')
        setImage(e.target.files[0])
    }

    const VideohandleChange = (e) => {
        setfronterror('')
        setVideo(e.target.files[0])
    }

    const getUserProfileInfo = useSelector(state => state.getUserProfile)
    const { fullUserProfileInfo } = getUserProfileInfo

    const AllpostsInfo = useSelector(state => state.allposts)
    const { posts } = AllpostsInfo

    const addedPost = useSelector(state => state.addPost)
    const { addedpost, loading, added } = addedPost

    const submitHandler = (e) => {
        e.preventDefault()
        if ((post_desc === '') && (image === '') && (video === '')) {
            setfronterror('Add sometheing to post')
        } else {
            dispatch(addPost(post_desc, image, video))
                .then(() => {
                    setfronterror('')
                    setImage('')
                    setVideo('')
                    setPost_desc('')
                    dispatch({ type: USER_ADD_POST_RESET })
                }
                )

        }
    }

    const user_like = (id) => {
        dispatch(post_like(id))

    }

    const user_dislike = (id) => {
        dispatch(post_dislike(id))

    }

    useEffect(() => {
        dispatch(allFeed())
    }, [reload])


    const CommentSubmitHandler = (e) => {


    }
    return (
        <div className="row">
            <div className="col-xl-3 firstbox">
                <div className="row">
                    <div className="col-xl-12 ">
                        <div className="profile card card-body px-3 pt-3 pb-0">
                            <div className="profile-head">
                                <div className="photo-content">
                                    <div className="cover-photo rounded" style={{ minHeight: "10.625rem", backgroundImage: `url(${fullUserProfileInfo.cover_pic})` }}></div>
                                </div>
                                <div className="profile-info">
                                    <div className="profile-photo">
                                        <img src={fullUserProfileInfo.pro_pic} className="img-fluid rounded-circle" style={{ minHeight: " 6rem", minWidth: "6rem" }} alt="" />
                                    </div>
                                    <div className="profile-details">
                                        <div className="profile-name px-3 pt-2">
                                            <h4 className="text-primary mb-0">{fullUserProfileInfo.full_name}</h4>
                                            <p>@{fullUserProfileInfo.username}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 ">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-statistics">
                                    <div className="text-center">
                                        <div className="row">
                                            <div className="col">
                                                <h3 className="m-b-0">{fullUserProfileInfo.followers}</h3><span>Followers</span>
                                            </div>

                                            <div className="col">
                                                <h3 className="m-b-0">{fullUserProfileInfo.following}</h3><span>Followings</span>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{fullUserProfileInfo.connections}</h3><span>Connections</span>
                                            </div>

                                        </div>
                                        <div className="mt-4">
                                            <a onClick={() => navigate('/profile')} className="btn btn-primary mb-1 me-1">Profile</a>
                                            <a href="/" className="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#sendMessageModal">Send Message</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="profile-tab">
                                    <div className="custom-tab-1">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item"><a href="#my-posts" data-bs-toggle="tab" className="nav-link active show">Posts</a>
                                            </li>
                                        </ul>

                                        <div className="tab-content">
                                            <div id="my-posts" className="tab-pane fade active show">
                                                <div className="my-post-content pt-3">
                                                    {fronterror && <Message variant='danger'>{fronterror}</Message>}
                                                    <div className="post-input" style={{ marginBottom: "0" }}>
                                                        <form onSubmit={submitHandler}>
                                                            <textarea name="post_desc" id="textarea" cols="30" rows="5" className="form-control bg-transparent" placeholder="Please type what you want...." value={post_desc} onChange={(e) => {
                                                                setfronterror('')
                                                                setPost_desc(e.target.value)
                                                                console.log(post_desc)
                                                            }}></textarea>
                                                            <a className="btn btn-primary light me-2 px-3" data-bs-toggle="modal" data-bs-target="#cameraModal"><i className="fa fa-camera m-0"></i> </a>
                                                            <a className="btn btn-primary light me-2 px-3" data-bs-toggle="modal" data-bs-target="#videomodal"><BsFillCameraVideoFill /></a>
                                                            <div className="modal fade" id="cameraModal">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title">Upload images</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            {image && <div className="input-group mb-3">
                                                                                <img
                                                                                    alt="Preview"
                                                                                    className='w-100 mb-3 rounded'
                                                                                    src={URL.createObjectURL(
                                                                                        image
                                                                                    )}
                                                                                ></img>

                                                                            </div>}
                                                                            <div className="input-group mb-3">
                                                                                <span className="input-group-text">Upload</span>
                                                                                <div className="form-file">
                                                                                    <input type="file" className="form-file-input form-control" onChange={ImagehandleChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continue</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal fade" id="videomodal">
                                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title">Upload video</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal">
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            {video && <div className="input-group mb-5">
                                                                                <video controls
                                                                                    alt="Preview"
                                                                                    className='w-100 mb-3 rounded'

                                                                                ><source src={URL.createObjectURL(video)} /></video>

                                                                            </div>}
                                                                            <div className="input-group mb-3">
                                                                                <span className="input-group-text">Upload</span>
                                                                                <div className="form-file">
                                                                                    <input type="file" className="form-file-input form-control" onChange={VideohandleChange} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer">

                                                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continue
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary" type="submit">Post</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="modal fade" id="replyModal">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">


                        <div className="card">
                            {loading && <Loader />}
                            {posts?.length !== 0 ? posts?.map((post, id) => (
                                <div key={id} className="card-body mt-4" style={{
                                    boxShadow: "0.3125rem 0.3125rem 0.3125rem 0.3125rem rgb(82 63 105 / 5%)", border: "0rem solid transparent",
                                    borderRadius: "1.375rem"
                                }}>
                                    <div className="post-details">
                                        <ul className="mb-2 post-meta " >
                                            <div className="profile-photo d-flex flex-wrap" >
                                                <img src={post.user.pro_pic} className="img-fluid rounded-circle me-1" style={{ width: "30px", height: "30px" }} alt="" />
                                                <li className="post-author me-3 mt-1 " >By {post.user.full_name}</li>
                                                <li className="post-date me-3 mt-1"><i className="fas fa-calendar-week me-2"></i>{dayjs(post.posted_at).format("d MMM YYYY")}</li>
                                                <li className="post-comment mt-1"><i className="far fa-comments me-2"></i> {post.comments}</li>

                                            </div>

                                        </ul>
                                        <Carousel>
                                            {post.post_content_img && <Carousel.Item>
                                                <img
                                                    className="d-block w-100 mb-3 rounded"
                                                    src={post.post_content_img}
                                                    alt="First slide"
                                                />

                                            </Carousel.Item>}
                                            {post.post_content_video && <Carousel.Item>
                                                <video
                                                    controls
                                                    className="d-block w-100 mb-3 rounded"
                                                    src={post.post_content_video}
                                                    alt="Second slide"
                                                />


                                            </Carousel.Item>}

                                        </Carousel>


                                        {post.post_desc && <h4 className='py-4'>{post.post_desc}</h4>}
                                        <div className="comment-respond d-flex flex-column" id="respond">
                                            <div className='d-flex '>
                                                {/* <button className="btn btn-primary me-2"><span className="me-2"><i className="fa fa-heart"></i></span>Like</button> */}
                                                <SlLike onClick={() => user_like(post.id)} style={{
                                                    height: " 4em",
                                                    width: "2em",
                                                    color: "black"
                                                }} />
                                                <p className='mt-4 ms-3'>{post.likes}</p>
                                                <SlDislike className='ms-3' onClick={() => user_dislike(post.id)} style={{
                                                    height: " 4em",
                                                    width: "2em",
                                                    color: "black"
                                                }} />
                                                <p className='mt-4 ms-3'>{post.dislikes}</p>
                                                <GoCommentDiscussion className='ms-3' style={{
                                                    height: " 4em",
                                                    width: "2em",
                                                    color: "black"
                                                }} />
                                                <p className='mt-4 ms-3'>{post.comments}</p>
                                                {/* <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#replyModal"><span className="me-2"><i className="fa fa-reply"></i></span>Comment</button> */}
                                            </div>
                                            <Accordion>
                                                <Accordion.Item eventKey="0" style={{ marginBottom: " 1.25rem" }}>

                                                    <Accordion.Header style={{ padding: "0", border: "none" }}>Post a Comment<i className="far fa-comments ms-2"></i></Accordion.Header>
                                                    <Accordion.Body>
                                                        <form onSubmit={handleSubmit(CommentSubmitHandler)}>
                                                            <div className="modal-body">
                                                                <div>
                                                                    <textarea className="form-control" rows="4" name='comment' {...register('comment', registerOptions.comment)} ></textarea>
                                                                    <small className="text-danger">
                                                                        {errors?.comment && errors.comment.message}
                                                                    </small>
                                                                </div>
                                                                <div>
                                                                    <button type="submit" className='btn btn-primary'>post</button>
                                                                </div>
                                                            </div>
                                                            {/* <div className="modal-footer">
                                                            </div> */}
                                                        </form>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>

                                    </div>

                                    {/* <div className="modal fade" id="replyModal">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">{post.id}</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <form onSubmit={handleSubmit(CommentSubmitHandler)}>
                                                    <div className="modal-body">

                                                        <textarea className="form-control" rows="4" name='comment' {...register('comment', registerOptions.comment)} ></textarea>
                                                        <small className="text-danger">
                                                            {errors?.comment && errors.comment.message}
                                                        </small>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btn-primary">Post</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            )) :
                                null
                            }
                        </div>
                    </div>

                </div>
            </div>


            <div className="col-xl-3 thirdbox">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-news">
                                <h5 className="text-primary d-inline">Our Latest News</h5>
                                <div className="media pt-3 pb-3">
                                    <img src="innap/images/profile/5.jpg" alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                        <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3">
                                    <img src="innap/images/profile/6.jpg" alt="image" className="me-3 rounded" width="75" />
                                    <div className="media-body">
                                        <h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
                                        <p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
                                    </div>
                                </div>
                                <div className="media pt-3 pb-3">
                                    <img src="innap/images/profile/7.jpg" alt="image" className="me-3 rounded" width="75" />
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