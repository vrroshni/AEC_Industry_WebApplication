import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



function AdminRoute() {
    return (
        !user.is_superuser ? <Navigate to="/restricted"/> : <Outlet />
    )
}

export default AdminRoute