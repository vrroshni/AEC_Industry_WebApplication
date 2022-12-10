import React, { useEffect } from 'react'


function Success() {


    const istyle = {
        color: "#ffff",
        fontSize: "100px",
        lineHeight: "200px",
        marginLeft: "-15px",
    };



    return (
        
        <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6">
                <div class="authincation-content">
                    <div class="row no-gutters">
                        <div class="col-xl-12">

                            <div class="card text-white bg-success  text-center" style={{ border: "none", borderRadius: "0" }} >
                                <div class="card-body mb-0 pb-3">
                                    <span class="me-3">
                                        <i class="checkmark" style={istyle}>✓</i>
                                    </span>
                                    <p class="card-text fs-4"> Your Payment is Successfull <br /> Now you are a premium member of Together</p> <br />
                                    <p class="card-text fs-1 fw-bold ">Congragulations!
                                    </p>

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