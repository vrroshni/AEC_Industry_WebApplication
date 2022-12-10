import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import { topremium } from '../../actions/userActions'



const PaypalCheckOutButton = (props) => {

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const { price } = props
  const dispatch = useDispatch()

  const successPaymentHandler = (price) => {
    dispatch(topremium(price))


    //success
    setPaidFor(true)

    // if response is error
    // alert("Your payment
  }
  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Thank you for your purchase!");
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
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
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}

      onError={(err) => {
        setError(err);
      }}

    />
  )
}

export default PaypalCheckOutButton