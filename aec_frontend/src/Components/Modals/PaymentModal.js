import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import BidPaypalButton from '../payment/BidPaypalButton';


function PaymentModal(props) {
    const dispatch = useDispatch()
    const price=(props.rate*6)/100
    const design=props.image
    console.log(props.image)



    return (
        <>
            <div class="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Payment</h5>
                            <button type="button" class="btn-close" onClick={() => props.handleModalClose()}>
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            <p>You have to pay 6% of rate to accept the Proposalbid!</p>
                            <p>Choose one way of payment!</p>
                           <h3> <strong>Design</strong> </h3> 
                        {design && <div className="input-group mb-3">
                                                        <img
                                                            alt="Preview"
                                                            className='w-100 mb-3 rounded'
                                                            src={design}
                                                        ></img>

                                                    </div>}
                            <BidPaypalButton price={price} id={props.id} modalfunc={()=>props.handleModalClose()}  />
                            <form action={'/stripepayment/'} method='POST'>
                                <input type="hidden" hidden name="price" value={price} />
                                <input type="hidden" hidden name="id" value={props.id} />
                               <button type='submit' className='btn btn-primary btn-rounded fs-4' style={{ width: "100%", borderRadius: "24px" }}><strong>Pay with Card</strong></button>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentModal