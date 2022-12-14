import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function Success() {


    const istyle = {
        color: "#ffff",
        fontSize: "100px",
        lineHeight: "200px",
        marginLeft: "-15px",
    };
    const Navigate = useNavigate()



    return (

        <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
                <div className="authincation-content">
                    <div className="row no-gutters">
                        <div className="col-xl-12">

                            <div className="card text-white bg-success  text-center" style={{ border: "none", borderRadius: "0" }} >
                                <div className="card-body mb-0 pb-3">
                                    <span className="me-3">
                                        <i className="review-icon rounded-circle btn-success me-3" style={{ fontSize: "70px" }}></i>
                                    </span>
                                    <p className="card-text fs-4"> Your Payment is Successfull <br /> Now you are a premium member of Together</p> <br />
                                    <p className="card-text fs-1 fw-bold ">Congragulations!
                                    </p>
                                    <a onClick={() => Navigate('/profile')} className=" btn bg-white text-success btn-card">Back to UserProfile
                                    </a>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success