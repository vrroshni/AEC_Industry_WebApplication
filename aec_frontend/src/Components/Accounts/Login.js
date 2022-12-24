import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, googleSignin } from '../../actions/userActions'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import Message from '../Message'
import Loader from '../Loader'
import jwt_decode from 'jwt-decode'






function Login() {
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const registerOptions = {
        username: { required: "Name is required" },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password will have at least 8 characters"
            }
        }
    };
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin
    function handleCallbackResponse(response) {
        dispatch(googleSignin(response))
    }

    useEffect(() => {
        if (userInfo?.is_superadmin) {
            navigate('/admin/')
            window.location.reload()
        }
        if (userInfo?.is_superadmin === false) {
            navigate('/')
        }
        /* global google */
        google.accounts.id.initialize({
            client_id: "343457976454-bvvnulla58ojkknd3l9jtb5kd10aq8ns.apps.googleusercontent.com",
            callback: handleCallbackResponse

        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: "large" }
        );

    }, [userInfo])

    const submitHandler = (e) => {
        dispatch(login(e.username, e.password))
    }


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

                                                <a >
                                                    {/* <img src="images/logo-full.png" alt="" /> */}
                                                </a>
                                            </div>
                                            <h4 className="text-center mb-4">Sign in your account</h4>
                                            {loading && <Loader />}
                                            {error && <Message variant='danger'>{error}</Message>}
                                            <form onSubmit={handleSubmit(submitHandler)} >
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Username</strong></label>
                                                    <input type="text" className="form-control" placeholder="username" name='username' {...register('username', registerOptions.username)} />
                                                    <small className="text-danger">
                                                        {errors?.username && errors.username.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Password</strong></label>
                                                    <input type="password" className="form-control" placeholder='••••••••' name='password' {...register('password', registerOptions.password)} />
                                                    <small className="text-danger">
                                                        {errors?.password && errors.password.message}
                                                    </small>
                                                </div>
                                                {/* <div className="row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="mb-3">
                                                        <a href="page-forgot-password.html">Forgot Password?</a>
                                                    </div>
                                                </div> */}
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
                                                </div>
                                            </form>
                                            <div className="new-account mt-3">
                                                <p>Don't have an account? <a className="text-primary" onClick={() => navigate('/register')} >Sign up</a></p>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <div id="signInDiv"></div>
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

export default Login

