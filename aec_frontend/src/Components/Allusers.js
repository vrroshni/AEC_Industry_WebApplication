import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, statuschange } from '../actions/adminActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'




function Allusers() {
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()

    const allUsersInfo = useSelector(state => state.allUsers)
    const { loading, error, users } = allUsersInfo


    const blockhandler=(id)=>{
        Swal.fire({
            title: 'Are you sure you want to do this action?',
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
  
                dispatch(statuschange(id))
                dispatch(listUsers())
  
            } 
  
        })
        
    }
    useEffect(() => {
        dispatch(listUsers())
    }, [reload])

    return (
        <div>
            {users?.length !== 0 ?
                (<>
                    <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active"><a >ALL USERS</a></li>
                            <li className="breadcrumb-item"><a >Usermanagement</a></li>
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

                                        <table className="table table-responsive-md">
                                            
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "80px" }}><strong>#</strong></th>
                                                    <th><strong>PROFILE</strong></th>
                                                    <th><strong>USER</strong></th>
                                                    <th><strong>DETAILS</strong></th>
                                                    <th><strong>STATUS</strong></th>
                                                    <th><strong>ACTION</strong></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            {loading && <Loader />}

                                                {users?.map((user, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td><strong>{id + 1}</strong></td>
                                                            <td><img className="rounded-circle" style={{
                                                                width: "72px",
                                                                height: "59px"
                                                            }} src={user.pro_pic} alt="" /></td>
                                                            <td>{user.full_name}</td>
                                                            <td>
                                                                <a href="#">
                                                                    <strong className="text-primary">#{user.id}</strong></a> with <strong>
                                                                    {user.username}</strong><br /><a href={user.email}>{user.email}{user.is_active}</a>
                                                            </td>
                                                            <td>{user.is_active === true ? <span className="badge light badge-success">Active</span> : <span className="badge light badge-danger">InActive</span>}</td>
                                                            <td>
                                                                {user.is_active === true ? <span onClick={()=>blockhandler(user.id)} className="btn btn-xs  btn-danger">Block</span> : <span onClick={()=>blockhandler(user.id)} className="btn btn-xs btn-success">Unblock</span>}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ) : (
                    <div className="row page-titles text-center">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active"><a href="/">NO USERS AVAILABLE</a></li>
                        </ol>
                    </div>
                )}

        </div>
    )
}

export default Allusers