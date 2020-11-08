import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HhUUlB933XkaPWn3lc2AUcAtNZmiIgkdy94JG87KRpEnO7Vw5QrGVF06jCCrQxcP7ZonLQPUYHHZYsaVpHTsiJk00WIR5r9bn';

    const onToken = token => {
    axios({
        url: 'payment',
        method: 'post',
        data: {
            amount: priceForStripe,
            token
        }
    }).then(res => {
            alert('Payment SuccessFul');
        }).catch(error => {
            alert('Payment not successful.Please use correct credentials.');
            console.log('displaying error:', error);
        });
};

    return (
        <StripeCheckout
            token={onToken}
            stripeKey={publishableKey}
            label='Pay Now'
            name = 'Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description= {`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
        />
)};

export default StripeButton;