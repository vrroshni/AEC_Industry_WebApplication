import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../actions/userActions'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch=useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,userInfo,error}=userLogin
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(username,password))
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
                                            <form onSubmit={submitHandler} >
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Username</strong></label>
                                                    <input value={username} type="text" className="form-control" placeholder="username" onChange={(e)=>{setUsername(e.target.value)
                                                    console.log(e.target.value)}}  />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Password</strong></label>
                                                    <input value={password} type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
                                                </div>
                                                <div className="row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="mb-3">
                                                        <a href="page-forgot-password.html">Forgot Password?</a>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
                                                </div>
                                            </form>
                                            <div className="new-account mt-3">
                                                <p>Don't have an account? <a className="text-primary" >Sign up</a></p>
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