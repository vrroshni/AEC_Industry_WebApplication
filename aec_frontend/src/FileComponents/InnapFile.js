import React from 'react'
import { Helmet } from 'react-helmet'

function InnapFile() {
    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="./vendor/chartist/css/chartist.min.css" />
                <link href="./innap/vendor/jquery-nice-select/css/nice-select.css" rel="stylesheet" />
                <link href="./innap/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
                {/* <!-- Style css --> */}
                <link href="./innap/css/style.css" rel="stylesheet" />

                {/* <!-- Required vendors --> */}
                <script src="./innap/vendor/global/global.min.js"></script>
                <script src="./innap/vendor/chart.js/Chart.bundle.min.js"></script>
                <script src="./innap/vendor/jquery-nice-select/js/jquery.nice-select.min.js"></script>

                {/* <!-- Chart piety plugin files --> */}
                <script src="./innap/vendor/peity/jquery.peity.min.js"></script>

                {/* <!-- Apex Chart --> */}
                <script src="./innap/vendor/apexchart/apexchart.js"></script>

                <script src="./innap/vendor/bootstrap-datetimepicker/js/moment.js"></script>
                <script src="./innap/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>

                {/* <!-- Dashboard 1 --> */}
                <script src="./innap/js/dashboard/dashboard-1.js"></script>
                <script src="./innap/js/custom.min.js"></script>
                <script src="./innap/js/deznav-init.js"></script>
            </Helmet>
        </div>
    )
}

export default InnapFile