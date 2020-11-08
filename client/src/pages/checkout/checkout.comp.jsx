import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCartItems, selectCartItemsPriceTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.comp";
import StripeButton from "../../components/stripe-button/stripe-button.component";

import './checkout.styles.scss';

const Checkout = ({cartItems, priceTotal}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>

        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
        }

        <div className="total">
            TOTAL: ${priceTotal}
        </div>
        <div className="test-warning">
            *Please use the test credit card for payments*
            <br/>
            5555 5555 5555 4444 - EXP: 01/23 - CVC:123
        </div>
        <StripeButton price={priceTotal}/>

    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    priceTotal: selectCartItemsPriceTotal
});

export default connect(mapStateToProps, null)(Checkout);