import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, updateProfile, getUserRequest,addProject } from '../../actions/userActions'
import { useNavigate, Link } from 'react-router-dom'
import Message from '../Message'
import Loader from '../Loader'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import UserProjects from './UserProjects';
import AddProjectModal from '../Modals/AddProjectModal'


function UserProfile() {

	const [reload, setReload] = useState(false)
	const [addprojectShowModal, setaddprojectShowModal] = useState(false)
    

	const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
		mode: "onChange"
	});
	const registerOptions = {
		username: { required: "Username is required" },
		firstname: { required: "First Name is required" },
		lastname: { required: "Last Name is required" },
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
	const { fullUserProfileInfo } = getUserProfileInfo

	const updateprofileinfo = useSelector(state => state.updateUserprofile)
	const { loading, result, updateerror } = updateprofileinfo


	const Profileinfo = useSelector((state) => state.userProfileVerification);
	let { fullProfileInfo, error, status, prof_request, prof_request_error } = Profileinfo;


	useEffect(() => {

		if (result) {
			dispatch(getUserProfile())
		}
		dispatch({ type: USER_UPDATE_PROFILE_RESET })
		dispatch(getUserRequest())

	}, [reload])

	const submitHandler = (e) => {
		dispatch(updateProfile(username, firstname, lastname, email, phonenumber, pro_pic, cover_pic, e.password))

	}

	const addProjecthandleShow = (id) => {
		setaddprojectShowModal(true)
	  }
	  const addProjecthandleOnhide = () => {
		setaddprojectShowModal(false)
	  }
	const [username, setUsername] = useState(fullUserProfileInfo?.username)
	const [firstname, setFirstname] = useState(fullUserProfileInfo?.first_name)
	const [lastname, setLastname] = useState(fullUserProfileInfo?.last_name)
	const [email, setEmail] = useState(fullUserProfileInfo?.email)
	const [phonenumber, setPhonenumber] = useState(fullUserProfileInfo?.phone_number)
	const [pro_pic, setPro_pic] = useState('');
	const [cover_pic, setCover_pic] = useState('');

console.log(fullUserProfileInfo,'infooooooooooo')
	
	return (
		<>
			{fullUserProfileInfo && (
				<>
					<div className="row page-titles">
						<ol className="breadcrumb">
							<li className="breadcrumb-item active"><a href="/">UserProfile</a></li>
							<li className="breadcrumb-item"><a href="/">{fullUserProfileInfo.full_name}</a></li>
						</ol>
					</div>
					<div className="row" style={{ cursor: "pointer" }}>
						<div className="col-lg-12">
							<div className="profile card card-body px-3 pt-3 pb-0">

								<div className="profile-head">
									<div className="photo-content">
										<div className="cover-photo rounded" style={{ backgroundImage: `url(${fullUserProfileInfo.cover_pic})` }}></div>
									</div>
									<div className="profile-info">
										<div className="profile-photo">
											<img src={fullUserProfileInfo.pro_pic} className="img-fluid rounded-circle" style={{ minHeight: " 6rem" }} alt="" />
										</div>
										<div className="profile-details">
											<div className="profile-name px-3 pt-2">
												<h4 className="text-primary mb-0">{fullUserProfileInfo.full_name}</h4>
												<p>@{fullUserProfileInfo.username}</p>
											</div>
											<div className="profile-email px-2 pt-2">
												<h4 className="text-muted mb-0">{fullUserProfileInfo.email}</h4>
												<p>Email</p>
											</div>
											<div className="dropdown ms-auto d-flex">
												<div className="profile-email px-2 pt-2" onClick={() => navigate('/profile_verification')}>
													{!fullUserProfileInfo.is_verified && <p className="text-dark mb-0">Want to become a part of <span className="text-primary">Together</span>?</p>}
												</div>
												<a href="#" className="btn btn-primary light sharp" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa fa-plus text-primary"></i></a>
												<ul className="dropdown-menu dropdown-menu-end">
													{(prof_request?.is_verified && !prof_request?.is_premium) && <li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> Premium Membership</li>}
													{prof_request?.is_premium && <li className="dropdown-item" onClick={() => navigate('/proposals')}><i className="fa fa-user-circle text-primary me-2"></i>Proposals Dashboard</li>}
													<li className="dropdown-item" onClick={() => navigate('/requests')}><i className="fa fa-user-circle text-primary me-2"></i>Requests Dashboard</li>

												</ul>
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

												<li className="nav-item"><a href="#my-posts" data-bs-toggle="tab" className="nav-link">Post</a>
												</li>
												<li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link">About Me</a>
												</li>
												<li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
												</li>
												{fullUserProfileInfo.is_verified && <li className="nav-item"><a href="#projects" data-bs-toggle="tab" className="nav-link">Projects</a>
												</li>}
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
															{loading && <Loader />}
															{updateerror && <Message variant='danger'>{updateerror}</Message>}

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
												{fullUserProfileInfo.is_verified && 
												<div id="projects" className="tab-pane fade">
													<div className="profile-personal-info">
														<div className="card">
															<div className="card-header d-md-flex d-block p-0">
																<div className="card-tabs mt-3 mt-sm-0 mb-sm-0 mb-3">
																	<ul className="nav nav-tabs shadow-none text-center" role="tablist">
																		<li className="nav-item">
																			<a className="nav-link active" data-bs-toggle="tab" href="#All" role="tab" aria-selected="true">Completed Projects</a>
																		</li>
																	</ul>
																</div>
																<div className="d-flex p-md-0 p-sm-4 p-3">
																	<ul className="star-review">
																		<button type="button" className="btn btn-primary btn-xs" onClick={()=>addProjecthandleShow()}>Add Project</button>
																	</ul>
																</div>
															</div>
															<div className="card-body pb-0">
																<div className="tab-content">
																	<div className="tab-pane show active" id="All">
																		{fullUserProfileInfo?.user_project.map((project,id) => {
																			return (

																				<UserProjects project={project} key={id+1} />
																			)
																		})}

																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												
												}
												{
													addprojectShowModal &&
													<AddProjectModal
													  showModal={addprojectShowModal}
													  handleModalClose={() => addProjecthandleOnhide()}
													/>
												  }
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
					</div>
				</>
			)}
		</>

	)
}

export default UserProfile