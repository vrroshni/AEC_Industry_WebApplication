import React from 'react'
import { Helmet } from 'react-helmet'

function LandingPageFiles() {
  return (
    <div>
      <Helmet>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        {/* <!-- Icon Font Stylesheet --> */}

        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

        {/* <!-- Libraries Stylesheet --> */}
        <link href="./userlandingpage/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="./userlandingpage/lib/animate/animate.min.css" rel="stylesheet" />

        {/* <!-- Customized Bootstrap Stylesheet --> */}
        <link href="./userlandingpage/css/bootstrap.min.css" rel="stylesheet" />

        {/* <!-- Template Stylesheet --> */}
        <link href="./userlandingpage/css/style.css" rel="stylesheet" />
        
        {/* <!-- JavaScript Libraries --> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
        <script src="./userlandingpage/lib/wow/wow.min.js"></script>
        <script src="./userlandingpage/lib/easing/easing.min.js"></script>
        <script src="./userlandingpage/lib/waypoints/waypoints.min.js"></script>
        <script src="./userlandingpage/lib/counterup/counterup.min.js"></script>
        <script src="./userlandingpage/lib/owlcarousel/owl.carousel.min.js"></script>

        {/* <!-- Template Javascript --> */}
        <script src="./userlandingpage/js/main.js"></script>
      </Helmet>
    </div>
  )
}

export default LandingPageFiles