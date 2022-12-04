import React,{useEffect,useState} from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { registeruser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'






function Register() {
    const [reload, setReload] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
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
            required: "Password confirmation is required",
            validate: (val) => {
                if (watch('password') != val) {
                    return "Your passwords didn't match";
                }
            },
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password will have at least 8 characters"
            }
        }
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRegister = useSelector(state => state.userRegister)
    const { loading,error,status } = userRegister
    useEffect(() => {
        if (status) {

            navigate('/login')
        } 

    }, [status])
    const submitHandler = (e) => {
        dispatch(registeruser( e.username,e.firstname,e.lastname, e.email,e.phonenumber,e.password))
        
    }
  

    return (
        <div className="" style={{ backgroundImage: "url(AECFiles/images/11.jpg)" }}>
            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6 mt-5">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center">
                                                {/* <a href="index.html"> */}
                                                    {/* <img src="AECFiles/images/logo-full.png" alt=""/> */}
                                                {/* </a> */}
                                            </div>
                                            <h4 className="text-center mb-4">Sign up your account</h4>
                                            {loading && <Loader />}
                                            {error && <Message variant='danger'>{error}</Message>}
                                            <form onSubmit={handleSubmit(submitHandler)} >
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>First Name</strong></label>
                                                    <input type="text" className="form-control" placeholder="First Name" name='firstname' {...register('firstname', registerOptions.firstname)} />
                                                    <small className="text-danger">
                                                        {errors?.firstname && errors.firstname.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Last Name</strong></label>
                                                    <input type="text" className="form-control" placeholder="Last Name" name='lastname' {...register('lastname', registerOptions.lastname)} />
                                                    <small className="text-danger">
                                                        {errors?.lastname && errors.lastname.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Username</strong></label>
                                                    <input type="text" className="form-control" placeholder="Username" name='username' {...register('username', registerOptions.username)} />
                                                    <small className="text-danger">
                                                        {errors?.username && errors.username.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Email</strong></label>
                                                    <input type="text" className="form-control" placeholder="hello@example.com" name='email' {...register('email', registerOptions.email)} />
                                                    <small className="text-danger">
                                                        {errors?.email && errors.email.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Phone Number</strong></label>
                                                    <input type="number" className="form-control" placeholder="212-999-0000" name='phonenumber' {...register('phonenumber', registerOptions.phonenumber)} />
                                                    <small className="text-danger">
                                                        {errors?.phonenumber && errors.phonenumber.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Password</strong></label>
                                                    <input type="password" className="form-control" name='password' placeholder='••••••••' {...register('password', registerOptions.password)} />
                                                    <small className="text-danger">
                                                        {errors?.password && errors.password.message}
                                                    </small>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Confirm Password</strong></label>
                                                    <input type="password" className="form-control" name='confirmpassword' placeholder='••••••••' {...register('confirmpassword', registerOptions.confirmpassword)} />
                                                    <small className="text-danger">
                                                        {errors?.confirmpassword && errors.confirmpassword.message}
                                                    </small>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <button type="submit" className="btn btn-primary btn-block">Sign me up</button>
                                                </div>
                                            </form>
                                            <div className="new-account mt-3">
                                                <p>Already have an account? <a className="text-primary" onClick={()=>navigate('/login')}>Sign in</a></p>
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

export default Register