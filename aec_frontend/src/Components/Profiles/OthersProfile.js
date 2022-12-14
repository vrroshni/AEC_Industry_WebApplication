import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUserProfile } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import Message from '../Message'
import Loader from '../Loader'
import { useParams } from 'react-router-dom'
import { OTHER_USER_PROFILE_RESET } from '../../constants/userConstants'
import Accordion from 'react-bootstrap/Accordion';
import dayjs from "dayjs";
import { SlLike, SlDislike } from 'react-icons/sl';
import { GoCommentDiscussion } from 'react-icons/go';
import Carousel from 'react-bootstrap/Carousel';
import Bluetick from '../UserSide/Bluetick';
import { addtoChat, post_like, post_dislike, user_commented, follow_unfollow, send_connection, getUserProfile } from '../../actions/userActions'
import {
	CHAT_FROM_PROFILE
} from '../../constants/userConstants'

import UserProjects from './UserProjects';



const mystyle = {
	background: "var(--primary)",
	marginLeft: "0.625rem",
	borderRadius: "0 1.375rem 1.375rem 1.375rem",
	padding: " 0.625rem 0.9375rem",
	color: "#fff",
	position: "relative"
}



function OthersProfile() {
	const [reload, setReload] = useState('')
	const [posterror, setPosterror] = useState('')
	const [comment, setComment] = useState('')



	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user_id = useParams().user_id

	const user_like = (id) => {
		dispatch(post_like(id)).then(() => dispatch(getOtherUserProfile(user_id))
		)
	}
	const Follow_unfollow = (id) => {
		dispatch(follow_unfollow(id)).then(() => dispatch(getOtherUserProfile(user_id))
		)

	}
	const Send_connection = (id) => {
		dispatch(send_connection(id)).then(() => dispatch(getOtherUserProfile(user_id))
		)


	}

	const user_dislike = (id) => {
		dispatch(post_dislike(id)).then(() => dispatch(getOtherUserProfile(user_id))
		)

	}
	const CommentSubmitHandler = (e) => {
		e.preventDefault()
		setPosterror('')
		if (e.target.comment.value === '') {
			setPosterror('Add comment to post')
			setComment('')
			return
		}
		dispatch(user_commented(e.target.post.value, comment))
		setComment('')
		setPosterror('')


	}


	const getUserProfileInfo = useSelector(state => state.getUserProfile)
	const { fullUserProfileInfo } = getUserProfileInfo


	const OthersProfile = useSelector(state => state.othersprofile)
	const { loading, error, otheruser } = OthersProfile
	useEffect(() => {

		dispatch(getOtherUserProfile(user_id))
		dispatch(getUserProfile())
		return () => {
			dispatch({ type: OTHER_USER_PROFILE_RESET })
		}
	}, [reload])

	const add_To_Chat = (receiver_id) => {
		dispatch(addtoChat(receiver_id)).then(() => {
			dispatch({
				type: CHAT_FROM_PROFILE,
				payload: receiver_id
			})
			navigate('/chat')
		})
	}


	return (
		<>
			<div className="row page-titles">
				<ol className="breadcrumb">
					<li className="breadcrumb-item active"><a href="/">UserProfile</a></li>
					<li className="breadcrumb-item"><a href="/">{otheruser?.full_name}</a></li>
				</ol>
			</div>
			<div className="row" style={{ cursor: "pointer" }}>
				<div className="col-lg-12">
					<div className="profile card card-body px-3 pt-3 pb-0">

						<div className="profile-head">
							<div className="photo-content">
								<div className="cover-photo rounded" style={{ backgroundImage: `url(${otheruser?.cover_pic})` }}></div>
							</div>
							<div className="profile-info">
								<div className="profile-photo">
									<img src={otheruser?.pro_pic} className="img-fluid rounded-circle" style={{ minHeight: " 6rem" }} alt="" />
								</div>
								<div className="profile-details">
									<div className="profile-name px-3 pt-2">
										<h4 className="text-primary mb-0">{otheruser?.full_name}</h4>
										<p>@{otheruser?.username}</p>
									</div>
									<div className="profile-email px-2 pt-2">
										<h4 className="text-muted mb-0">{otheruser?.email}</h4>
										<p>Email</p>
									</div>
									<div className="dropdown ms-auto d-flex">
										<div className="profile-email px-2 pt-2">
											<button className='btn btn-primary btn-xs' onClick={() => Follow_unfollow(otheruser?.id)} >{otheruser?.user_network?.some(e => e.followed_by === fullUserProfileInfo.id) ? "Unfollow" : "follow"}</button>
										</div>
										<div className="profile-email px-2 pt-2" >
											{otheruser?.user_network?.some(e => e.is_connect === null && e.followed_by === fullUserProfileInfo.id) ? <button className='btn btn-primary btn-xs' onClick={() => Send_connection(otheruser.id)} > Connect </button> :
												otheruser?.user_network?.some(e => e.is_connect === false && e.followed_by === fullUserProfileInfo.id) ? <button className='btn btn-primary btn-xs disabled' >PENDING </button> : otheruser?.user_network?.some(e => e.is_connect === true && e.followed_by === fullUserProfileInfo.id) ?
													<button className='btn btn-primary btn-xs' onClick={() => add_To_Chat(otheruser.id)}> Message </button> : null
											}
										</div>
										{/* <a href="#" className="btn btn-primary light sharp" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa fa-plus text-primary"></i></a>
											<ul className="dropdown-menu dropdown-menu-end">
												<li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> Become</li>
												<li className="dropdown-item"><i className="fa fa-users text-primary me-2"></i> Add to btn-close friends</li>
												<li className="dropdown-item"><i className="fa fa-plus text-primary me-2"></i> Add to group</li>
												<li className="dropdown-item"><i className="fa fa-ban text-primary me-2"></i> Block</li>
											</ul> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body">
							<div className="profile-tab">
								<div className="custom-tab-1">
									<ul className="nav nav-tabs">
										<li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link">About Me</a>
										</li>

										{otheruser?.is_verified && <li className="nav-item"><a href="#projects" data-bs-toggle="tab" className="nav-link">Projects</a>
										</li>}
									</ul>

									<div className="tab-content">
										<div id="about-me" className="tab-pane fade">
											<div className="profile-personal-info">
												<div className="row mb-2 text-center mt-4">
													<h3 className="text-primary mb-4">Personal Information</h3>
												</div>
												<div className="row mb-2">
													<div className="col-sm-3 col-5">
														<h5 className="f-w-500">Name <span className="pull-end">:</span>
														</h5>
													</div>
													<div className="col-sm-9 col-7"><span>{otheruser?.full_name}</span>
													</div>
												</div>
												<div className="row mb-2">
													<div className="col-sm-3 col-5">
														<h5 className="f-w-500">Username<span className="pull-end">:</span></h5>
													</div>
													<div className="col-sm-9 col-7"><span>{otheruser?.username}</span>
													</div>
												</div>
												<div className="row mb-2">
													<div className="col-sm-3 col-5">
														<h5 className="f-w-500">Email <span className="pull-end">:</span>
														</h5>
													</div>
													<div className="col-sm-9 col-7"><span>{otheruser?.email}</span>
													</div>
												</div>
												<div className="row mb-2">
													<div className="col-sm-3 col-5">
														<h5 className="f-w-500">Phone Number <span className="pull-end">:</span></h5>
													</div>
													<div className="col-sm-9 col-7"><span>{otheruser?.phone_number}</span>
													</div>
												</div>
											</div>
										</div>
										{otheruser?.is_verified &&
											<div id="projects" className="tab-pane fade">
												<div className="profile-personal-info">
													<div className="card">
														<div className="card-header d-md-flex d-block p-0">
															<div className="card-tabs mt-3 mt-sm-0 mb-sm-0 mb-3">
																<ul className="nav nav-tabs shadow-none text-center" role="tablist">
																	<li className="nav-item">
																		<a className="nav-link active" data-bs-toggle="tab" href="#All" role="tab" aria-selected="true">Completed Projects {otheruser?.projects}</a>
																	</li>
																</ul>
															</div>
															<div className="d-flex p-md-0 p-sm-4 p-3">
																<ul className="star-review">
																	<button type="button" className="btn btn-primary btn-xs">Add Project</button>
																</ul>
															</div>
														</div>
														<div className="card-body pb-0">
															<div className="tab-content">
																<div className="tab-pane show active" id="All">
																	{otheruser?.user_project.map((project, id) => {
																		return (

																			<UserProjects project={project} key={id + 1} />
																		)
																	})}

																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										}
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-xl-12">
				<div className="card">
					{/* {loading && <Loader />} */}
					{otheruser?.user_post?.length !== 0 ? otheruser?.user_post?.map((post, id) => (
						<div key={id} className="card-body mt-4" style={{
							boxShadow: "0.3125rem 0.3125rem 0.3125rem 0.3125rem rgb(82 63 105 / 5%)", border: "0rem solid transparent",
							borderRadius: "1.375rem"
						}}>
							<div className="post-details">
								<ul className="mb-2 post-meta " >
									<div className="profile-photo d-flex flex-wrap" >
										<img src={post.user.pro_pic} className="img-fluid rounded-circle me-1" style={{ width: "30px", height: "30px" }} alt="" />
										<li className="post-author   mt-1 " >By {post.user.full_name} </li>{post.user.is_verified && <Bluetick />}
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
										{console.log(post?.post_reaction, 'kkkkkkkkkkkkkkkkkkkkkk')}
										{
											post?.post_reaction.some(e => e.type === 'LIKE' && e.user === fullUserProfileInfo.id) ?
												<SlLike className="ms-3" onClick={() => user_like(post.id)} style={{
													height: " 4em",
													width: "2em",
													color: "#1362fc"
												}} /> :
												<SlLike className="ms-3" onClick={() => user_like(post.id)} style={{
													height: " 4em",
													width: "2em",
													color: "black"
												}} />
										}

										<p className='mt-4 ms-3'>
											{post.likes}
										</p>
										{
											post?.post_reaction.some(e => e.type === 'DISLIKE' && e.user === fullUserProfileInfo.id) ?
												<SlDislike className="ms-3" onClick={() => user_dislike(post.id)} style={{
													height: " 4em",
													width: "2em",
													color: "#1362fc"
												}} /> :
												<SlDislike className="ms-3" onClick={() => user_dislike(post.id)} style={{
													height: " 4em",
													width: "2em",
													color: "black"
												}} />
										}
										<p className='mt-4 ms-3'>
											{post.dislikes}
										</p>
										<GoCommentDiscussion className='ms-3' style={{
											height: " 4em",
											width: "2em",
											color: "black"
										}} />

										<p className='mt-4 ms-3'>
											{post.comments}
										</p>
									</div>
									<Accordion>
										<Accordion.Item eventKey="0" style={{ marginBottom: " 1.25rem" }}>
											<Accordion.Header style={{ padding: "0", border: "none" }}>Post a Comment<i className="far fa-comments ms-2"></i></Accordion.Header>
											<Accordion.Body>
												<form onSubmit={CommentSubmitHandler}>
													<div className="modal-body" style={{ padding: "0" }}>
														<div className="row">
															<div className='col-10'>
																<input type="text" name="post" hidden value={post.id} />
																<textarea className="form-control mb-3" rows="4" value={comment} name='comment' onChange={(e) => {
																	setPosterror('')
																	setComment(e.target.value)
																}}  ></textarea>
																{posterror && <Message variant='danger'>{posterror}</Message>}
															</div>
															<div className='col-2'>
																<button type="submit" className='btn btn-primary'>post</button>
															</div>
														</div>

													</div>

												</form>
												{(post.post_comment).map(comment => (
													<div className="d-flex justify-content-start mb-3">
														<div className="img_cont_msg">
															<img src={comment.user.pro_pic} className="rounded-circle user_img_msg" alt="" style={{ width: "30px", height: "30px" }} />
														</div>
														<div className="msg_cotainer" style={mystyle} >
															{comment.comment_desc}
														</div>
													</div>

												))}

											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</div>
						</div>
					)) :
						null
					}
				</div>
			</div>
		</>
	)
}

export default OthersProfile