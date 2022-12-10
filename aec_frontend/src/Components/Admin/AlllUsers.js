import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, statuschange } from '../../actions/adminActions'
import Swal from 'sweetalert2'

function AlllUsers() {
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()

    const allUsers = useSelector(state => state.allUsers)
    const { loading, error, users } = allUsers

    useEffect(() => {
        dispatch(listUsers())
    }, [reload])

    return (
        <>{users?.length !== 0 ?
            <>
                <div className="row page-titles">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active"><a >ALL Users</a></li>
                        <li className="breadcrumb-item"><a >User Management</a></li>
                    </ol>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Users</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "80px" }}><strong>#</strong></th>
                                                <th><strong>PROFILE</strong></th>
                                                <th><strong>USER</strong></th>
                                                <th><strong>ACTION</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody id="orders">
                                            {users?.map((user, id) => {
                                                return (
                                                    <tr className="btn-reveal-trigger" key={id}>
                                                        <td >{id + 1}
                                                        </td>
                                                        <td >
                                                            <img className="rounded-circle" style={{
                                                                width: "72px",
                                                                height: "65px"
                                                            }} src={user.pro_pic} alt="" />
                                                            <p className='mt-2 ms-3'><strong>{user.full_name}</strong></p>
                                                        </td>
                                                        <td><a href="#">
                                                            <strong className="text-primary">#{user.id}</strong></a> with <strong>
                                                                {user.username}</strong><br /><a href={user.email}>{user.email}</a>
                                                        </td>

                                                        <td >
                                                        {user.is_active === true ?
                                                            <span onClick={()=>Swal.fire({
                                                                    title: 'Are you sure you want to do this Action?',
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
                                                                        dispatch(statuschange(user.id))
                                                                            .then(() => {
                                                                                setReload(!reload)
                                                                            })

                                                                    }

                                                                })
                                                            } className="btn btn-xs  btn-danger"> Block</span>:
                                                            <span onClick={()=>Swal.fire({
                                                                title: 'Are you sure you want to do this Action?',
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
                                                                    dispatch(statuschange(user.id))
                                                                        .then(() => {
                                                                            setReload(!reload)
                                                                        })

                                                                }

                                                            })
                                                        } className="btn btn-xs  btn-success">UnBlock</span>
                                                            }
                                                        </td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> </> :
            <div className="row page-titles text-center mt-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active"><h1>NO USERS AVAILABLE</h1> </li>
                </ol>
            </div>
        }

        </>
    )
}

export default AlllUsers