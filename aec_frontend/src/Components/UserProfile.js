import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateProfile } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
	const [reload, setReload] = useState(false)
	const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
		mode: "onChange"
	});
	const registerOptions = {
		username: { required: "Username is required" },
		firstname: { required: "First Name is required" },
		lastname: { required: "Last Name is required" },
		// pro_pic: {  },
		// cover_pic: {  },
		email: {
			required: "Email is required",
			pattern: {
				value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
				message: 'Email is not valid.'
			}
		},
		phonenumber: {
			required: "Phone Number is required",
			maxLength: {
				value: 10,
				message: "Phone number Should be 10 digits"
			},
			minLength: {
				value: 10,
				message: "Phone number Should be 10 digits"
			},
		},
		confirmpassword: {
			validate: (val) => {
				if (watch('password') != val) {
					return "Your passwords didn't match";
				}
			},
		},
		password: {
			minLength: {
				value: 8,
				message: "Password will have at least 8 characters"
			}
		}
	};
	const FirstnameRegister = register("firstname", registerOptions.firstname)
	const LastNameRegister = register("lastname", registerOptions.lastname)
	const UsernameRegister = register("username", registerOptions.username)
	const EmailRegister = register("email", registerOptions.email)
	const PhoneNumberRegister = register("phonenumber", registerOptions.phonenumber)
	const ProfilePicRegister = register("pro_pic", registerOptions.pro_pic)
	const CoverPicRegister = register("cover_pic", registerOptions.cover_pic)

	const dispatch = useDispatch()
	const navigate = useNavigate()


	const getUserProfileInfo = useSelector(state => state.getUserProfile)
	const { loading, error, fullUserProfileInfo,status } = getUserProfileInfo

	const updateprofileinfo = useSelector(state => state.updateUserprofile)
	const {  result,updateerror } = updateprofileinfo

	useEffect(() => {
		dispatch(getUserProfile())
		if (result) {
            console.log('successs')
        } else if (status === false) {
            console.log('error')
        } else {
            console.log('nothing happens')
        }


	}, [reload])

	const submitHandler = (e) => {
		dispatch(updateProfile(username, firstname, lastname, email, phonenumber, pro_pic, cover_pic, e.password))
			.then(() => {
				setReload(!reload)
			})
	}
	const [username, setUsername] = useState(fullUserProfileInfo?.username)
	const [firstname, setFirstname] = useState(fullUserProfileInfo?.first_name)
	const [lastname, setLastname] = useState(fullUserProfileInfo?.last_name)
	const [email, setEmail] = useState(fullUserProfileInfo?.email)
	const [phonenumber, setPhonenumber] = useState(fullUserProfileInfo?.phone_number)
	const [pro_pic, setPro_pic] = useState('');
	const [cover_pic, setCover_pic] = useState('');
	return (
		<div className="container">
			{fullUserProfileInfo && (<>
				<div className="row">
					<div className="col-lg-12">
						<div className="profile card card-body px-3 pt-3 pb-0">

							<div className="profile-head">
								<div className="photo-content">
									<div className="cover-photo rounded"></div>
								</div>
								<div className="profile-info">
									<div className="profile-photo">
										<img src="/innap/images/profile/profile.png" className="img-fluid rounded-circle" alt="" />
									</div>
									<div className="profile-details">
										<div className="profile-name px-3 pt-2">
											<h4 className="text-primary mb-0">{fullUserProfileInfo.username}</h4>
										</div>
										<div className="profile-email px-2 pt-2">
											<h4 className="text-muted mb-0">{fullUserProfileInfo.email}</h4>
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
				</div>
				<div className="row">
					{/* <div className="col-xl-4">
						<div className="row">
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div className="profile-statistics">
											<div className="text-center">
												<div className="row">
													<div className="col">
														<h3 className="m-b-0">150</h3><span>Follower</span>
													</div>
													<div className="col">
														<h3 className="m-b-0">140</h3><span>Place Stay</span>
													</div>
													<div className="col">
														<h3 className="m-b-0">45</h3><span>Reviews</span>
													</div>
												</div>
												<div className="mt-4">
													<a href="/" className="btn btn-primary mb-1 me-1">Follow</a> 
													<a href="/" className="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#sendMessageModal">Send Message</a>
												</div>
											</div>
											<div className="modal fade" id="sendMessageModal">
												<div className="modal-dialog modal-dialog-centered" role="document">
													<div className="modal-content">
														<div className="modal-header">
															<h5 className="modal-title">Send Message</h5>
															<button type="button" className="btn-close" data-bs-dismiss="modal"></button>
														</div>
														<div className="modal-body">
															<form className="comment-form">
																<div className="row"> 
																	<div className="col-lg-6">
																		<div className="mb-3">
																			<label className="text-black font-w600 form-label">Name <span className="required">*</span></label>
																			<input type="text" className="form-control" value="Author" name="Author" placeholder="Author"/>
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="mb-3">
																			<label className="text-black font-w600 form-label">Email <span className="required">*</span></label>
																			<input type="text" className="form-control" value="Email" placeholder="Email" name="Email"/>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="mb-3">
																			<label className="text-black font-w600 form-label">Comment</label>
																			<textarea rows="8" className="form-control" name="comment" placeholder="Comment"></textarea>
																		</div>
																	</div>
																	<div className="col-lg-12">
																		<div className="mb-3 mb-0">
																			<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
																		</div>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div className="profile-blog">
											<h5 className="text-primary d-inline">Today Highlights</h5>
											<img src="images/profile/1.jpg" alt="" className="img-fluid mt-4 mb-4 w-100"/>
											<h4><a href="post-details.html" className="text-black">Darwin Creative Agency Theme</a></h4>
											<p className="mb-0">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div className="profile-interest">
											<h5 className="text-primary d-inline">Interest</h5>
											<div className="row mt-4 sp4" id="lightgallery">
												<a href="images/profile/2.jpg" data-exthumbimage="images/profile/2.jpg" data-src="images/profile/2.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/2.jpg" alt="" className="img-fluid"/>
												</a>
												<a href="images/profile/3.jpg" data-exthumbimage="images/profile/3.jpg" data-src="images/profile/3.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/3.jpg" alt="" className="img-fluid"/>
												</a>
												<a href="images/profile/4.jpg" data-exthumbimage="images/profile/4.jpg" data-src="images/profile/4.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/4.jpg" alt="" className="img-fluid"/>
												</a>
												<a href="images/profile/3.jpg" data-exthumbimage="images/profile/3.jpg" data-src="images/profile/3.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/3.jpg" alt="" className="img-fluid"/>
												</a>
												<a href="images/profile/4.jpg" data-exthumbimage="images/profile/4.jpg" data-src="images/profile/4.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/4.jpg" alt="" className="img-fluid"/>
												</a>
												<a href="images/profile/2.jpg" data-exthumbimage="images/profile/2.jpg" data-src="images/profile/2.jpg" className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
													<img src="images/profile/2.jpg" alt="" className="img-fluid"/>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-12">
								<div className="card">
									<div className="card-body">
										<div className="profile-news">
											<h5 className="text-primary d-inline">Our Latest News</h5>
											<div className="media pt-3 pb-3">
												<img src="images/profile/5.jpg" alt="image" className="me-3 rounded" width="75"/>
												<div className="media-body">
													<h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
													<p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
												</div>
											</div>
											<div className="media pt-3 pb-3">
												<img src="images/profile/6.jpg" alt="image" className="me-3 rounded" width="75"/>
												<div className="media-body">
													<h5 className="m-b-5"><a href="post-details.html" className="text-black">Collection of textile samples</a></h5>
													<p className="mb-0">I shared this on my fb wall a few months back, and I thought.</p>
												</div>
											</div>
											<div className="media pt-3 pb-3">
												<img src="images/profile/7.jpg" alt="image" className="me-3 rounded" width="75"/>
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
                    </div> */}
					<div className="col-xl-12">
						<div className="card">
							<div className="card-body">
								<div className="profile-tab">
									<div className="custom-tab-1">
										<ul className="nav nav-tabs">

											<li className="nav-item"><a href="#my-posts" data-bs-toggle="tab" className="nav-link">Post</a>
											</li>
											<li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link">About Me</a>
											</li>
											<li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
											</li>
										</ul>

										<div className="tab-content">
											<div id="my-posts" className="tab-pane fade active show">
												<div className="my-post-content pt-3">
													<div className="post-input">
														<textarea name="textarea" id="textarea" cols="30" rows="5" className="form-control bg-transparent" placeholder="Please type what you want...."></textarea>

														<a href="/" className="btn btn-primary light me-1 px-3" data-bs-toggle="modal" data-bs-target="#cameraModal"><i className="fa fa-camera m-0"></i> </a>
														<div className="modal fade" id="cameraModal">
															<div className="modal-dialog modal-dialog-centered" role="document">
																<div className="modal-content">
																	<div className="modal-header">
																		<h5 className="modal-title">Upload images</h5>
																		<button type="button" className="btn-close" data-bs-dismiss="modal">
																		</button>
																	</div>
																	<div className="modal-body">
																		<div className="input-group mb-3">
																			<span className="input-group-text">Upload</span>
																			<div className="form-file">
																				<input type="file" className="form-file-input form-control" />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<a href="/" className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#postModal">Post</a>
														<div className="modal fade" id="postModal">
															<div className="modal-dialog modal-dialog-centered" role="document">
																<div className="modal-content">
																	<div className="modal-header">
																		<h5 className="modal-title">Post</h5>
																		<button type="button" className="btn-close" data-bs-dismiss="modal">
																		</button>
																	</div>
																	<div className="modal-body">
																		<textarea name="textarea" id="textarea2" cols="30" rows="5" className="form-control bg-transparent" placeholder="Please type what you want...."></textarea>
																		<a className="btn btn-primary btn-rounded" href="/">Post</a>
																	</div>
																</div>
															</div>
														</div>
													</div>



												</div>
											</div>

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
														<div className="col-sm-9 col-7"><span>{fullUserProfileInfo.full_name}</span>
														</div>
													</div>
													<div className="row mb-2">
														<div className="col-sm-3 col-5">
															<h5 className="f-w-500">Username<span className="pull-end">:</span></h5>
														</div>
														<div className="col-sm-9 col-7"><span>{fullUserProfileInfo.username}</span>
														</div>
													</div>
													<div className="row mb-2">
														<div className="col-sm-3 col-5">
															<h5 className="f-w-500">Email <span className="pull-end">:</span>
															</h5>
														</div>
														<div className="col-sm-9 col-7"><span>{fullUserProfileInfo.email}</span>
														</div>
													</div>
													<div className="row mb-2">
														<div className="col-sm-3 col-5">
															<h5 className="f-w-500">Phone Number <span className="pull-end">:</span></h5>
														</div>
														<div className="col-sm-9 col-7"><span>{fullUserProfileInfo.phone_number}</span>
														</div>
													</div>
													
													
												</div>
											</div>
											<div id="profile-settings" className="tab-pane fade">
												<div className="pt-3">
													<div className="settings-form">
														<div className=" mb-3 text-center">
															<h3 className="text-primary">Edit User Profile</h3>
														</div>

														<form onSubmit={handleSubmit(submitHandler)}>
															<div className="row mt-4">
																<div className="mb-3 col-md-6">
																	<label className="form-label">First Name</label>
																	<input type="text" placeholder="First Name" className="form-control" name='firstname' value={firstname}   {...FirstnameRegister}
																		onChange={e => {
																			FirstnameRegister.onChange(e);
																			setFirstname(e.target.value);
																			console.log(firstname)
																		}} />
																	<small className="text-danger">
																		{errors?.firstname && errors.firstname.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Last Name</label>
																	<input type="text" placeholder="Last Name" className="form-control" name='lastname' value={lastname}  {...LastNameRegister}
																		onChange={e => {
																			LastNameRegister.onChange(e);
																			setLastname(e.target.value);
																		}} />
																	<small className="text-danger">
																		{errors?.lastname && errors.lastname.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Username</label>
																	<input type="text" placeholder="Username" className="form-control" name='username' value={username}  {...UsernameRegister}
																		onChange={e => {
																			UsernameRegister.onChange(e);
																			setUsername(e.target.value);
																			console.log(username)
																		}} />
																	<small className="text-danger">
																		{errors?.username && errors.username.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Email</label>
																	<input type="email" placeholder="Email" className="form-control" name='email' value={email}  {...EmailRegister}
																		onChange={e => {
																			EmailRegister.onChange(e);
																			setEmail(e.target.value);
																		}} />
																	<small className="text-danger">
																		{errors?.email && errors.email.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Phone Number</label>
																	<input type="number" placeholder="212-999-0000" className="form-control" name='phonenumber' value={phonenumber}  {...PhoneNumberRegister}
																		onChange={e => {
																			PhoneNumberRegister.onChange(e);
																			setPhonenumber(e.target.value);
																		}} />
																	<small className="text-danger">
																		{errors?.phonenumber && errors.phonenumber.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Password</label>
																	<input type="password" placeholder='••••••••' className="form-control" name='password' {...register('password', registerOptions.password)}
																	/>
																	<small className="text-danger">
																		{errors?.password && errors.password.message}
																	</small>

																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Confirm Password</label>
																	<input type="password" placeholder='••••••••' className="form-control" name='confirmpassword' {...register('confirmpassword', registerOptions.confirmpassword)}
																	/>
																	<small className="text-danger">
																		{errors?.confirmpassword && errors.confirmpassword.message}
																	</small>
																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Profile Pic</label>
																	<div className="form-file">
																		<input
																			control={control}
																			type="file"
																			className="form-file-input form-control"
																			name="pro_pic"
																			{...ProfilePicRegister}
																			onChange={e => {
																				ProfilePicRegister.onChange(e);
																				setPro_pic(e.target.files[0]);
																				console.log(e.target.files[0], 'eeeeeeeeeeeeeeeeeeeeeeee')
																			}}
																		/>

																	</div>
																	<small className="text-danger">
																		{errors?.pro_pic && errors.pro_pic.message}
																	</small>

																	{pro_pic && <div className="input-group mb-3 mt-3">
																		<img
																			alt="Preview"
																			width="200px"
																			height="200px"
																			src={URL.createObjectURL(
																				pro_pic
																			)}
																		></img>

																	</div>}

																</div>
																<div className="mb-3 col-md-6">
																	<label className="form-label">Cover Pic</label>
																	<div className="form-file">
																		<input
																			control={control}
																			type="file"
																			className="form-file-input form-control"
																			name="cover_pic"
																			{...CoverPicRegister}
																			onChange={e => {
																				CoverPicRegister.onChange(e);
																				setCover_pic(e.target.files[0]);
																				console.log(e.target.files[0], 'eeeeeeeeeeeeeeeeeeeeeeee')

																			}}
																		/>

																	</div>
																	<small className="text-danger">
																		{errors?.cover_pic && errors.cover_pic.message}
																	</small>
																	{cover_pic && <div className="input-group mb-3  mt-3">
																		<img
																			alt="Preview"
																			width="200px"
																			height="200px"
																			src={URL.createObjectURL(
																				cover_pic
																			)}
																		></img>

																	</div>}
																</div>


															</div>



															<div className="mb-3 text-center" >
																<button className="btn btn-primary col-3" type="submit">Update Profile
																</button>
															</div>
														</form>
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
								</div>
							</div>
						</div>
					</div>
				</div> </>)}
		</div>

	)
}

export default UserProfile