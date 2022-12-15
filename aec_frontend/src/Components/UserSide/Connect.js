import React, { useEffect } from 'react'
import { FcLike } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {connectUs} from '../../actions/userActions'
import {USER_CONNECT_US_RESET} from '../../constants/userConstants'



function Connect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const connectUsDetails = useSelector(state => state.connectUs)
    const { loading,connect,error } = connectUsDetails



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const registerOptions = {
        role: {
            required: "Your Requirement is required",

        },
        related: {
            required: "Your Related Work is required",

        },
        location: {
            required: "Location is required",
            pattern: {
                value: /^[A-Za-z]+$/,
                message: "Enter valid Location",
            },
        },
        requirementdetails: {
            required: "Requirement Details is required",
            pattern: {
                value: /^[a-zA-Z!”$%&'()*\+,\/;\[\\\]\^_`{|}~. ]+$/,
                message: "Enter valid Requiremnt Details about yourself",
            },
        },
        experience: {
            required: "Experience is required",
            maxLength: {
                value: 2,
                message: "Enter Valid experience",
            },
            minLength: {
                value: 1,
                message: "Enter Valid experience",
            },
        },
    };
    
    useEffect(() => {

        if(connect){
          navigate('/requests')
        }
      
        return () => {
          dispatch({
              type: USER_CONNECT_US_RESET
          })
        }
      }, [connect])
    const submitHandler = (e) => {
        dispatch(connectUs(e.role,e.location,e.requirementdetails,e.experience,e.related))
    };



    
    return (
        <div className="vh-100" style={{ backgroundImage: "url(AECFiles/images/11.jpg)" }}>
            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-9">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">

                                                <a >
                                                    {/* <img src="images/logo-full.png" alt="" /> */}
                                                </a>
                                            </div>
                                            <h3 className="text-center mb-4">We will Help You <FcLike style={{}} /> </h3>
                                            <div className="basic-form">
                                                <form onSubmit={handleSubmit(submitHandler)}  >
                                                    <div className="mb-3 row">
                                                        <label className="col-sm-3 col-form-label">Requirement Details</label>
                                                        <div className="col-sm-9">
                                                            <textarea className="form-control" rows="4" id="comment" placeholder='Tell us about your requirement..' style={{ height: "50px" }} {...register('requirementdetails', registerOptions.requirementdetails)}></textarea>
                                                            <small className="text-danger">
                                                                {errors?.requirementdetails && errors.requirementdetails.message}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label className="col-sm-3 col-form-label">Location</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" className="form-control" placeholder="Location (preferred) " name='location' {...register('location', registerOptions.location)} />
                                                            <small className="text-danger">
                                                                {errors?.location && errors.location.message}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <label className="col-sm-3 col-form-label">Experience</label>
                                                        <div className="col-sm-9">
                                                            <input type="number" min={0} className="form-control" placeholder="Experience (preferred) " name='experience'  {...register('experience', registerOptions.experience)} />
                                                            <small className="text-danger">
                                                                {errors?.experience && errors.experience.message}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <fieldset className="mb-3">
                                                        <div className="row">
                                                            <label className="col-form-label col-sm-3 pt-0">Requirement</label>
                                                            <div className="col-sm-9">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="role" value="ARCHITECT"  {...register('role', registerOptions.role)} />
                                                                    <label className="form-check-label">
                                                                        Architect
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="role" value="ENGINEER" {...register('role', registerOptions.role)} />
                                                                    <label className="form-check-label">
                                                                        Engineer
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="role" value="CONSTRUCTOR" {...register('role', registerOptions.role)} />
                                                                    <label className="form-check-label">
                                                                        Constructor
                                                                    </label>
                                                                </div>
                                                                <small className="text-danger">
                                                                    {errors?.role && errors.role.message}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div className="mb-3 row">
                                                        <div className="col-sm-3">Work(Related)</div>
                                                        <div className="col-sm-9">
                                                            <div className="form-check">
                                                                <input className="form-check-input" name='related' value="HouseWork" type="radio" {...register('related', registerOptions.related)} />
                                                                <label className="form-check-label">
                                                                    House Work
                                                                </label>
                                                            </div>

                                                        </div>
                                                        <div className="col-sm-3"></div>
                                                        <div className="col-sm-9">
                                                            <div className="form-check">
                                                                <input className="form-check-input" name='related' value="Others" type="radio" {...register('related', registerOptions.related)} />
                                                                <label className="form-check-label">
                                                                    Others
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3"></div>
                                                        <div className="col-sm-9"><small className="text-danger">
                                                            {errors?.related && errors.related.message}
                                                        </small></div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <div className="col-sm-12">
                                                            <button type="submit" className="btn btn-primary btn-block">Apply</button>
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
            </div>
        </div>
    )
}

export default Connect