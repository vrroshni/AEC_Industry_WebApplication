import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminCommon from './AdminCommon'
import AdminNavbar from './AdminNavbar'
import Footer from './Footer'
import Navbar from './Navbar'

function common() {
  return (
    <div id="main-wrapper" class="show menu-toggle">
      <Navbar />
      <div class="content-body">
        <div class="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default common