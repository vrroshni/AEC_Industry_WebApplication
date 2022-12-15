import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, getUserProfile, allFeed } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function Navbar() {

    const userInfo = useSelector(state => state.getUserProfile)
    const { fullUserProfileInfo } = userInfo
    
    const dispatch = useDispatch()
    const navigate = useNavigate()    

    useEffect(() => {
        if (!fullUserProfileInfo) {
            dispatch(getUserProfile())
            dispatch(allFeed())
        }

    }, [])

    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure you want to Logout?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            if (result.isConfirmed) {
  
                dispatch(logout())
  
            } 
  
        })

       
        

    }
    return (
        <div>
            <div className="nav-header">
                <a  className="brand-logo">
                    {/* <svg className="logo-abbr" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <rect className="rect-primary-rect" width="80" height="80" rx="16" fill="#1362FC" />
                            <circle cx="42" cy="19" r="10" fill="white" />
                            <circle cx="75.5" cy="76.5" r="16.5" fill="#12A7FB" />
                            <circle cx="5.5" cy="1.5" r="17.5" fill="#1362FC" />
                            <circle className="rect-primary-rect-1" cx="5.5" cy="1.5" r="16.5" stroke="white" stroke-opacity="0.66" strokeWidth="2" />
                            <path d="M33.7656 87.2159C34.9565 76.5246 37.5874 53.6112 38.5845 47.4881V47.4881C39.1698 43.8941 40.2547 47.2322 39.8692 50.8531C38.9933 59.0813 37.1429 74.1221 35.5121 87.4131C33.1225 106.889 33.3507 95.974 33.7635 88.0818" stroke="white" strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect className="rect-primary-rect" width="80" height="80" rx="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg> */}

                </a>
                <div className="nav-control">
                    <div className="hamburger">
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>


            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar">
                                    Together
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                {fullUserProfileInfo ?
                                    <>
                                        <li className="nav-item">
                                            <div className="input-group search-area">
                                                <input type="text" className="form-control" placeholder="Search here" />
                                                <span className="input-group-text"><a href="/"><i className="flaticon-381-search-2"></i></a></span>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown notification_dropdown">
                                            <a className="nav-link bell-link ai-icon" href="/">
                                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M23.6667 5.16666C23.6667 2.5895 21.5772 0.5 19 0.5C15.1162 0.5 8.88387 0.5 5.00004 0.5C2.42287 0.5 0.333374 2.5895 0.333374 5.16666V20.3333C0.333374 20.8058 0.618046 21.2305 1.05321 21.4113C1.48955 21.5922 1.99121 21.4918 2.32487 21.1582C2.32487 21.1582 4.59287 18.8902 5.9672 17.517C6.4047 17.0795 6.99739 16.8333 7.61689 16.8333H19C21.5772 16.8333 23.6667 14.7438 23.6667 12.1667V5.16666ZM21.3334 5.16666C21.3334 3.87866 20.2892 2.83333 19 2.83333C15.1162 2.83333 8.88387 2.83333 5.00004 2.83333C3.71204 2.83333 2.66671 3.87866 2.66671 5.16666V17.517L4.31638 15.8673C5.19138 14.9923 6.37905 14.5 7.61689 14.5H19C20.2892 14.5 21.3334 13.4558 21.3334 12.1667V5.16666ZM6.16671 12.1667H15.5C16.144 12.1667 16.6667 11.644 16.6667 11C16.6667 10.356 16.144 9.83333 15.5 9.83333H6.16671C5.52271 9.83333 5.00004 10.356 5.00004 11C5.00004 11.644 5.52271 12.1667 6.16671 12.1667ZM6.16671 7.5H17.8334C18.4774 7.5 19 6.97733 19 6.33333C19 5.68933 18.4774 5.16666 17.8334 5.16666H6.16671C5.52271 5.16666 5.00004 5.68933 5.00004 6.33333C5.00004 6.97733 5.52271 7.5 6.16671 7.5Z" fill="#1362FC" />
                                                </svg>
                                                <div className="pulse-css"></div>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown notification_dropdown">
                                            <a className="nav-link  ai-icon" href="/" role="button" data-bs-toggle="dropdown">
                                                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.83333 3.91738V1.50004C8.83333 0.856041 9.356 0.333374 10 0.333374C10.6428 0.333374 11.1667 0.856041 11.1667 1.50004V3.91738C12.9003 4.16704 14.5208 4.97204 15.7738 6.22504C17.3057 7.75687 18.1667 9.8347 18.1667 12V16.3914L19.1105 18.279C19.562 19.1832 19.5142 20.2565 18.9822 21.1164C18.4513 21.9762 17.5122 22.5 16.5018 22.5H11.1667C11.1667 23.144 10.6428 23.6667 10 23.6667C9.356 23.6667 8.83333 23.144 8.83333 22.5H3.49817C2.48667 22.5 1.54752 21.9762 1.01669 21.1164C0.484686 20.2565 0.436843 19.1832 0.889509 18.279L1.83333 16.3914V12C1.83333 9.8347 2.69319 7.75687 4.22502 6.22504C5.47919 4.97204 7.0985 4.16704 8.83333 3.91738ZM10 6.1667C8.45183 6.1667 6.96902 6.78154 5.87469 7.87587C4.78035 8.96904 4.16666 10.453 4.16666 12V16.6667C4.16666 16.8475 4.12351 17.026 4.04301 17.1882C4.04301 17.1882 3.52384 18.2265 2.9755 19.322C2.88567 19.5029 2.89501 19.7187 3.00117 19.8902C3.10734 20.0617 3.29517 20.1667 3.49817 20.1667H16.5018C16.7037 20.1667 16.8915 20.0617 16.9977 19.8902C17.1038 19.7187 17.1132 19.5029 17.0234 19.322C16.475 18.2265 15.9558 17.1882 15.9558 17.1882C15.8753 17.026 15.8333 16.8475 15.8333 16.6667V12C15.8333 10.453 15.2185 8.96904 14.1242 7.87587C13.0298 6.78154 11.547 6.1667 10 6.1667Z" fill="#1362FC" />
                                                </svg>
                                                <div className="pulse-css"></div>
                                            </a>

                                        </li>
                                        <li className="nav-item dropdown notification_dropdown">
                                            <a className="nav-link ai-icon" href="/" data-bs-toggle="dropdown">
                                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.15608 11.6592C0.937571 10.4299 0.253296 8.76839 0.253296 7.03607C0.253296 5.29415 0.944772 3.62306 2.17648 2.39134C3.4082 1.15963 5.0793 0.46814 6.82122 0.46814C8.56315 0.46814 10.2342 1.15963 11.466 2.39134L11.9149 2.84033L12.3639 2.39134C13.5956 1.15963 15.2655 0.46814 17.0075 0.46814C18.7506 0.46814 20.4205 1.15963 21.6522 2.39134C22.8839 3.62306 23.5766 5.29415 23.5766 7.03607C23.5766 8.76839 22.8923 10.4299 21.6726 11.6592L12.7625 21.0939C12.5428 21.3268 12.2355 21.4589 11.9149 21.4589C11.5944 21.4589 11.2871 21.3268 11.0674 21.0939L2.15608 11.6592ZM11.9149 18.5945L19.9799 10.0553L20.0039 10.0313C20.7974 9.23659 21.244 8.15974 21.244 7.03607C21.244 5.9124 20.7974 4.83556 20.0039 4.04083C19.2092 3.2461 18.1311 2.79951 17.0075 2.79951C15.885 2.79951 14.807 3.2461 14.0122 4.04083L12.7397 5.31456C12.2835 5.76955 11.5452 5.76955 11.0902 5.31456L9.81646 4.04083C9.02293 3.2461 7.94489 2.79951 6.82122 2.79951C5.69756 2.79951 4.62071 3.2461 3.82598 4.04083C3.03125 4.83556 2.58586 5.9124 2.58586 7.03607C2.58586 8.15974 3.03125 9.23659 3.82598 10.0313C3.83438 10.0397 3.84158 10.0469 3.84879 10.0553L11.9149 18.5945Z" fill="#1362FC" />
                                                </svg>
                                                <div className="pulse-css"></div>
                                            </a>

                                        </li>

                                        <li className="nav-item dropdown header-profile">
                                            <a className="nav-link" href="/" role="button" data-bs-toggle="dropdown">
                                                <img src={fullUserProfileInfo.pro_pic} alt="" />
                                                <div className="header-info ms-3">
                                                    <span>{fullUserProfileInfo.username}</span>
                                                    {fullUserProfileInfo.is_superadmin ? <small>Superadmin</small> : <small>User</small>}                                        </div>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <a onClick={() => navigate('/profile')} className="dropdown-item ai-icon">
                                                    <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                    <span className="ms-2">Profile </span>
                                                </a>
                                                <a onClick={logoutHandler} className="dropdown-item ai-icon">
                                                    <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                    <span className="ms-2">Logout </span>
                                                </a>
                                            </div>
                                        </li>
                                    </>
                                    :
                                    <li className="nav-item dropdown notification_dropdown">
                                        <button type="button" className="btn btn-rounded btn-primary btn-sm" onClick={() => navigate('/login')}>Login/Register</button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="deznav">
                <div className="deznav-scroll">
                    {
                        fullUserProfileInfo &&
                        <>
                            <ul className="metismenu" id="menu">
                                <li><a className="has-arrow ai-icon" aria-expanded="false">
                                    <i className="flaticon-025-dashboard"></i>
                                    <span className="nav-text">Together</span>
                                </a>
                                    <ul aria-expanded="false">
                                        <li><a onClick={() => navigate('/')} >Home</a></li>
                                    </ul>
                                </li>
                                <li><a className="has-arrow ai-icon" aria-expanded="false">
                                    <i className="flaticon-050-info"></i>
                                    <span className="nav-text">Profile</span>
                                </a>
                                    <ul aria-expanded="false">
                                        <li><a onClick={() => navigate('/profile')} >User Profile</a></li>
                                    </ul>
                                </li>
                                <li><a className="has-arrow ai-icon" aria-expanded="false">
                                    <i className="flaticon-041-graph"></i>
                                    <span className="nav-text">Feed</span>
                                </a>
                                    <ul aria-expanded="false">
                                        <li><a onClick={() => navigate('/feed')} >Feed </a></li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar