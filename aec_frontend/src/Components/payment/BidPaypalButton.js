import React,{useState} from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { acceptbid } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'


function BidPaypalButton(props) {

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const Navigate = useNavigate()

    const { price } = props
    const dispatch = useDispatch()

    const successPaymentHandler = (id) => {
        dispatch(acceptbid(id)).then(() => Navigate('/requests'))
        
        //success
        setPaidFor(true)

        // if response is error
        // alert("Your payment
    }





    return (
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}

            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: price
                            }
                        }
                    ]
                })
            }}

            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                successPaymentHandler(props.id);
            }}

            onCancel={() => {
                props.modalfunc()
                Navigate('/proposalbids')

            }}

            onError={(err) => {
                setError(err);
            }}

        />
    )

}

export default BidPaypalButton