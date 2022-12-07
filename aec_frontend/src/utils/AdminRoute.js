import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate, } from 'react-router-dom'
import { useSelector } from 'react-redux'




function AdminRoute() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    return (
        !userInfo?.is_superadmin ? <Navigate to="/restricted" /> : <Outlet />
    )
}

export default AdminRoute