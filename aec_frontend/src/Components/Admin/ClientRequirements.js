import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { list_client_requirements, requirement_rejected, requirement_shared } from '../../actions/adminActions'




function ClientRequirements() {
    const [reload, setReload] = useState(false)
    const dispatch = useDispatch()


    const ClientRequirements = useSelector(state => state.allClientRequirements)
    const { loading, error, requirements } = ClientRequirements

    const RequirementAction = useSelector(state => state.clientRequirementAction)
    const { shared, rejected } = RequirementAction


    useEffect(() => {
        dispatch(list_client_requirements())
    }, [reload])


    return (
        <>

            {requirements?.length !== 0 ?
                <>
                    <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active"><a href="/">ALL CLIENT REQUIREMENT REQUESTS</a></li>
                            <li className="breadcrumb-item"><a href="/">Client Requirement management</a></li>
                        </ol>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">All Client Requirement Requests</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-sm mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="align-middle">#</th>
                                                    <th className="align-middle">FROM</th>
                                                    <th className="align-middle">ROLE</th>
                                                    <th className="align-middle" style={{ minWidth: "12rem" }}>DETAILS</th>
                                                    <th className="align-middle ">STATUS</th>
                                                    <th className="align-middle ">SHARE</th>
                                                    <th className="align-middle ">REJECT</th>
                                                </tr>
                                            </thead>
                                            <tbody id="orders">
                                                {requirements?.map((requirement, id) => {
                                                    return (
                                                        <tr className="btn-reveal-trigger" key={id}>
                                                            <td >{id + 1}
                                                        </td>
                                                        <td >
                                                            <img className="rounded-circle" style={{
                                                                width: "72px",
                                                                height: "65px"
                                                            }} src={requirement.request_from.pro_pic} alt="" />
                                                            <p className='mt-2 ms-3'><strong>{requirement.request_from.full_name}</strong></p>
                                                        </td>
                                                        <td>{requirement.role}</td>
                                                        <td><a href="#">
                                                            ID: <strong className="text-primary">#{requirement.id}</strong> <br />
                                                            Location: <strong >{requirement.location}</strong><br />
                                                            Experience: <strong >{requirement.experience}</strong><br />
                                                            Details: <strong >{requirement.requirementdetails}</strong>
                                                            </a>
                                                            
                                                        </td>
                                                        <td ><button className="btn btn-xs  btn-dark">{requirement.status}</button> </td>
                                                        <td ><button className="btn btn-xs  btn-success" onClick={()=>Swal.fire({
                                                                    title: 'Are you sure you want to share the proposal?',
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
                                                                        dispatch(requirement_shared(requirement.id))
                                                                            .then(() => {
                                                                                setReload(!reload)
                                                                            })

                                                                    }

                                                                })
                                                            }
                                                        >SHARE</button> </td>
                                                        <td><button className="btn btn-xs  btn-danger" onClick={()=>Swal.fire({
                                                                    title: 'Are you sure you want to reject the proposal?',
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
                                                                        dispatch(requirement_rejected(requirement.id))
                                                                            .then(() => {
                                                                                setReload(!reload)
                                                                            })

                                                                    }

                                                                })
                                                            }
                                                        >REJECT</button> </td>
                                                        </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <h1>No Client Requirements</h1>
            }
        </>
    )
}

export default ClientRequirements