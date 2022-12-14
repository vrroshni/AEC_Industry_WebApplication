import React from 'react'

function OthersProfile() {

	return (
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
											<p className="text-dark mb-0">Want to become a part of <span className="text-primary">Together</span>?</p>
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
										
										<li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Projects</a>
										</li>
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
		</>
	)
}

export default OthersProfile