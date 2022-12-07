import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'




function AdminRoute() {
    
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo} = userLogin

    return (
        !userInfo.is_superadmin ? <Navigate to="/restricted"/> : <Outlet />
    )
}

export default AdminRoute