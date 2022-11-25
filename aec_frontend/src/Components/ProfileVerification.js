import React from 'react'
import '../componentsCSS/pdfpreview.css'

function ProfileVerification() {
    return (
        <div>
            <div className="vh-100" style={{ backgroundImage: "url(AECFiles/images/11.jpg)" }}>
                <div className="authincation h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Form Validation</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-validation">
                                    <form className="needs-validation" noValidate >
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom01">Username
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
														<input type="text" className="form-control" id="validationCustom01"  placeholder="Enter a username.." required/>
														<div className="invalid-feedback">
															Please enter a username.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom02">Email <span
                                                            className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom02"  placeholder="Your valid email.." required/>
														<div className="invalid-feedback">
															Please enter a Email.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom03">Password
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="password" className="form-control" id="validationCustom03" placeholder="Choose a safe one.." required/>
														<div className="invalid-feedback">
															Please enter a password.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom04">Suggestions <span
                                                            className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <textarea className="form-control" id="validationCustom04"  rows="5" placeholder="What would you like to see?" required></textarea>
														<div className="invalid-feedback">
															Please enter a Suggestions.
														</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom05">Best Skill
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <select className="default-select wide form-control" id="validationCustom05">
                                                            <option  data-display="Select">Please select</option>
                                                            <option value="html">HTML</option>
                                                            <option value="css">CSS</option>
                                                            <option value="javascript">JavaScript</option>
                                                            <option value="angular">Angular</option>
                                                            <option value="angular">React</option>
                                                            <option value="vuejs">Vue.js</option>
                                                            <option value="ruby">Ruby</option>
                                                            <option value="php">PHP</option>
                                                            <option value="asp">ASP.NET</option>
                                                            <option value="python">Python</option>
                                                            <option value="mysql">MySQL</option>
                                                        </select>
														<div className="invalid-feedback">
															Please select a one.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom06">Currency
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom06" placeholder="$21.60" required/>
														<div className="invalid-feedback">
															Please enter a Currency.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom07">Website
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom07"  placeholder="http://example.com" required/>
														<div className="invalid-feedback">
															Please enter a url.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom08">Phone (US)
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom08" placeholder="212-999-0000" required/>
														<div className="invalid-feedback">
															Please enter a phone no.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom09">Digits <span
                                                            className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom09"  placeholder="5" required/>
														<div className="invalid-feedback">
															Please enter a digits.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom10">Number <span
                                                            className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom10" placeholder="5.0" required/>
														<div className="invalid-feedback">
															Please enter a num.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label" htmlFor="validationCustom11">Range [1, 5]
                                                        <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-6">
                                                        <input type="text" className="form-control" id="validationCustom11" placeholder="4" required/>
														<div className="invalid-feedback">
															Please select a range.
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label className="col-lg-4 col-form-label"><a
                                                            href="javascript:void()">Terms &amp; Conditions</a> <span
                                                            className="text-danger">*</span>
                                                    </label>
                                                    <div className="col-lg-8">
                                                        <div className="form-check">
														  <input className="form-check-input" type="checkbox" value="" id="validationCustom12" required/>
														  <label className="form-check-label" htmlFor="validationCustom12">
															Agree to terms and conditions
														  </label>
														</div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <div className="col-lg-8 ms-auto">
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>





                        {/* <div className="attachments-container margin-top-0 margin-bottom-0">
												<div className="attachment-box ripple-effect">
													<span>Cover Letter</span>
													<i>PDF</i>
													<button className="remove-attachment" data-tippy-placement="top" title="Remove"></button>
												</div>
												<div className="attachment-box ripple-effect">
													<span>Contract</span>
													<i>DOCX</i>
													<button className="remove-attachment" data-tippy-placement="top" title="Remove"></button>
												</div>
											</div>
											<div className="clearfix"></div> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileVerification