import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { account_verify_otp, registeredUserDetails, resend_otp } from '../../actions/userActions'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Message from '../Message'
import Loader from '../Loader'




function Account_Verify() {
    const [reload, setreload] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const registerOptions = {
        otp: { required: "OTP is required" },

    };

    const userRegister = useSelector(state => state.userRegister)
    const { registereduser } = userRegister

    const accountverify = useSelector(state => state.accountverify)
    const { loading, otpverified, emailverified, error } = accountverify

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        dispatch(account_verify_otp(registereduser?.id, e.otp)).then(() =>         dispatch(registeredUserDetails(registereduser?.id))
        )
    }

    useEffect(() => {
        if(otpverified)
        navigate('/login')
        dispatch(registeredUserDetails(registereduser?.id))
    }, [otpverified, reload])


    return (
        <div className="vh-100" style={{ backgroundImage: "url(AECFiles/images/11.jpg)" }}>

            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                <a href="index.html"><img src="images/logo-full.png" alt="" /></a>
                                            </div>
                                            <h4 className="text-center mb-4">Account Verfication</h4>
                                            {loading && <Loader />}
                                            {error && <Message variant='danger'>{error}</Message>}
                                            <form onSubmit={handleSubmit(submitHandler)}>
                                                <div className="mb-3">
                                                    <input type="number" className="form-control" name='otp' placeholder='Enter the OTP' {...register('otp', registerOptions.otp)} />
                                                    <small className="text-danger">
                                                        {errors?.otp && errors.otp.message}
                                                    </small>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <p onClick={() => dispatch(resend_otp(registereduser?.id))}> Resend</p>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-block">Verify</button>
                                                </div>
                                            </form>
                                            <div className="text-center">
                                                <h4 className="mt-4 mb-4">OR</h4>
                                                <a href="https://mail.google.com/" target="_blank" className="btn btn-primary btn-block">Verify With Email</a>
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

export default Account_Verify