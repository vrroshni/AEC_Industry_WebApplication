import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PaypalCheckOutButton from './PaypalCheckOutButton'
import { Button } from 'react-bootstrap'
import SmallLoader from '../SmallLoader'

// AfBesFrxUd_ToMWFBV5zyKiSKdJlIbhN4yNjsJHMsfDFuVI5H5UlnUrzyu2U_c-PPEEyYdZxNRPkWHvx
function Payment_Confirmation() {
    const price = useParams().price

    const topremiumPay = useSelector((state) => state.topremium);
    const { loading, successpayment } = topremiumPay

    const Profileinfo = useSelector((state) => state.userProfileVerification);
    let { prof_request } = Profileinfo;

    return (


        <div className="row justify-content-center h-100 align-items-center d-flex flex-column">
            <div className="col-xl-6">
                <div className="card">
                    <div className="card-body text-center">
                        <div className="bootstrap-carousel">
                            <div data-bs-ride="carousel" className="carousel slide" id="carouselExampleCaptions">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src="/innap/images/big/img5.jpg" alt="" />
                                        <div className="carousel-caption d-none d-md-block" style={{ background: "none" }}>
                                            <h5>First slide label</h5>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item active">
                                        <img alt="" className="d-block w-100" src="/innap/images/big/img6.jpg" />
                                        <div className="carousel-caption d-none d-md-block" style={{ background: "none" }}>
                                            <h5>Second slide label</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img alt="" className="d-block w-100" src="/innap/images/big/img7.jpg" />
                                        <div className="carousel-caption d-none d-md-block" style={{ background: "none" }}>
                                            <h5>Third slide label</h5>
                                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <div className="col-xl-4 text-center">

                {!prof_request.is_premium && (
                    <>
                    
                        {loading ? <SmallLoader /> : <PaypalCheckOutButton price={price} />}
                        <form action={`/create-checkout-session/${price}/`} method='POST'>
                            <input type="hidden" hidden name="userid" value={prof_request.user.id} />
                            {loading ? <SmallLoader /> : <Button type='submit' className='btn btn-primary btn-rounded fs-4' style={{ width: "100%", borderRadius: "24px" }}><strong>Pay with Card</strong></Button>}
                        </form>
                        </>
                )}
            </div>
        </div>

    )
}

export default Payment_Confirmation