import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { registeredUserDetails, account_verify_link } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


function Email_Verify() {
    const token = useParams().token

    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { registereduser } = userRegister

    const accountverify = useSelector(state => state.accountverify)
    const { loading, otpverified, emailverified, error } = accountverify


    useEffect(() => {
        if (emailverified === true) {
            Navigate('/login')
        }
        if (!registereduser?.is_email_verified) {
            dispatch(account_verify_link(registereduser?.id, token))
        }

    }, [emailverified])

    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                marginTop: '100px',
                height: '50px',
                width: '50px',
                margin: 'auto',
                display: 'block'
            }}
        >
        </Spinner>)
}

export default Email_Verify