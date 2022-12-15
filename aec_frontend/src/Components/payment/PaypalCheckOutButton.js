import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { topremium } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'



const PaypalCheckOutButton = (props) => {

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const Navigate=useNavigate()

  const { price } = props
  const dispatch = useDispatch()

  const successPaymentHandler = (price) => {
    dispatch(topremium(price)).then(()=>Navigate('/success'))


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
        successPaymentHandler(price);
      }}
      
      onCancel={() => {
        Navigate('/cancelled')

      }}

      onError={(err) => {
        setError(err);
      }}

    />
  )
}

export default PaypalCheckOutButton