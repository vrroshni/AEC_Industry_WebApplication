import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import Footer from './Footer'


function AdminCommon() {
    return (
        <div id="main-wrapper">
            <AdminNavbar />
            <div class="content-body">
            <div class="container-fluid">
                
                    <Outlet />
              </div>  
            </div>

            <Footer />

        </div>
    )
}

export default AdminCommon